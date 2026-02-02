import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  fileName?: string;
  fileContent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);
    const { name, email, phone, message, fileName, fileContent }: InquiryRequest = await req.json();

    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, message");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const attachments = [];
    if (fileName && fileContent) {
      attachments.push({
        filename: fileName,
        content: fileContent,
      });
    }

    const emailResponse = await resend.emails.send({
      from: "Inquiries <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      replyTo: email,
      subject: `استفسار جديد من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">استفسار جديد</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">الاسم:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">البريد الإلكتروني:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">رقم الهاتف:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">الرسالة:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
            </tr>
            ${fileName ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">ملف مرفق:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${fileName}</td>
            </tr>
            ` : ''}
          </table>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log("Inquiry email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-inquiry function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
