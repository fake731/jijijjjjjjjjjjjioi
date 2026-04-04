import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateOTP(): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

async function hashOTP(otp: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp + "salt_qusay_2024");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { action, email, full_name, otp, new_password } = await req.json();

    if (action === "request") {
      // Step 1: Verify email + full_name match
      if (!email || !full_name) {
        return new Response(JSON.stringify({ error: "البيانات غير مكتملة" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check if user exists with matching email and display_name
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, display_name, email")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (!profile) {
        return new Response(JSON.stringify({ error: "البيانات غير صحيحة" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Compare names (normalize spaces)
      const normalize = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
      if (normalize(profile.display_name || "") !== normalize(full_name)) {
        return new Response(JSON.stringify({ error: "البيانات غير صحيحة" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Rate limit: check recent OTPs for this email
      const { data: recentOtps } = await supabase
        .from("password_reset_otps")
        .select("id, created_at")
        .eq("email", email.trim().toLowerCase())
        .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString());

      if (recentOtps && recentOtps.length >= 5) {
        return new Response(JSON.stringify({ error: "تم تجاوز الحد الأقصى للمحاولات. حاول بعد 5 دقائق." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generate OTP
      const otpCode = generateOTP();
      const otpHash = await hashOTP(otpCode);
      const expiresAt = new Date(Date.now() + 60 * 1000).toISOString(); // 60 seconds

      // Cleanup old OTPs for this email
      await supabase.from("password_reset_otps").delete().eq("email", email.trim().toLowerCase());

      // Store OTP
      await supabase.from("password_reset_otps").insert({
        email: email.trim().toLowerCase(),
        otp_hash: otpHash,
        expires_at: expiresAt,
      });

      return new Response(JSON.stringify({ success: true, otp: otpCode }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      // Step 2: Verify OTP
      if (!email || !otp) {
        return new Response(JSON.stringify({ error: "البيانات غير مكتملة" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const otpHash = await hashOTP(otp);

      const { data: otpRecord } = await supabase
        .from("password_reset_otps")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .eq("otp_hash", otpHash)
        .eq("used", false)
        .gte("expires_at", new Date().toISOString())
        .maybeSingle();

      if (!otpRecord) {
        // Increment attempts
        await supabase.rpc("cleanup_expired_otps");
        return new Response(JSON.stringify({ error: "الكود غير صحيح أو منتهي الصلاحية" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (otpRecord.attempts >= otpRecord.max_attempts) {
        return new Response(JSON.stringify({ error: "تم تجاوز الحد الأقصى للمحاولات" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Mark as used
      await supabase
        .from("password_reset_otps")
        .update({ used: true })
        .eq("id", otpRecord.id);

      return new Response(JSON.stringify({ success: true, verified: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "reset") {
      // Step 3: Reset password
      if (!email || !new_password) {
        return new Response(JSON.stringify({ error: "البيانات غير مكتملة" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (new_password.length < 6) {
        return new Response(JSON.stringify({ error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find user by email
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const targetUser = users?.find((u: any) => u.email?.toLowerCase() === email.trim().toLowerCase());

      if (!targetUser) {
        return new Response(JSON.stringify({ error: "المستخدم غير موجود" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update password
      const { error } = await supabase.auth.admin.updateUserById(targetUser.id, {
        password: new_password,
      });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Cleanup
      await supabase.from("password_reset_otps").delete().eq("email", email.trim().toLowerCase());

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "إجراء غير معروف" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "حدث خطأ في الخادم" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
