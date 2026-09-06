import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/payments/PaymentForm";
import { usePlans, useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check, Sparkles, Clock, Infinity as InfinityIcon, ShieldCheck } from "lucide-react";

const SubscribePage = () => {
  const { plans } = usePlans();
  const { subscription, pending, refresh } = useSubscription();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPlan = plans.find((p) => p.plan_key === selected);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-5xl" dir="rtl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">اشتراك الذكاء الاصطناعي</h1>
            <p className="text-xs text-muted-foreground">فعّل الذكاء لمدة شهر كامل عبر تحويل بنكي آمن</p>
          </div>
        </div>

        {subscription && (
          <Card className="mb-6 border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-sm text-foreground">
                اشتراكك <b>{subscription.plan_key === "pro" ? "الكامل" : "الأساسي"}</b> فعّال حتى{" "}
                {new Date(subscription.expires_at).toLocaleDateString("ar")}
              </p>
            </CardContent>
          </Card>
        )}

        {pending && !subscription && (
          <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-sm text-foreground">طلبك قيد المراجعة، سيتم التفعيل فور تأكيد استلام التحويل.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`border transition-all ${
                selected === plan.plan_key ? "border-primary/60 bg-primary/5" : "border-border/30 bg-card/50"
              } backdrop-blur-sm`}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {plan.unlimited ? (
                      <InfinityIcon className="w-5 h-5 text-primary" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-primary" />
                    )}
                    <h2 className="text-base font-bold text-foreground">{plan.name_ar}</h2>
                  </div>
                  <div className="text-left">
                    <span className="text-2xl font-bold text-foreground" dir="ltr">${Number(plan.price_usd)}</span>
                    <span className="text-xs text-muted-foreground block">/ شهر</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={selected === plan.plan_key ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelected(plan.plan_key)}
                >
                  {selected === plan.plan_key ? "الباقة المختارة" : "اختر هذه الباقة"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <Card className="mt-6 border-primary/25 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">
                إتمام الدفع — {selectedPlan.name_ar} (${Number(selectedPlan.price_usd)})
              </h3>
              <PaymentForm
                kind="subscription"
                planKey={selectedPlan.plan_key}
                amount={Number(selectedPlan.price_usd)}
                onDone={refresh}
              />
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SubscribePage;
