import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleAnimationsPaused, useAnimationsPaused } from "@/hooks/useAnimationsPaused";
import { useLanguage } from "@/hooks/use-language";

const MotionToggle = () => {
  const paused = useAnimationsPaused();
  const { language } = useLanguage();
  const label = paused
    ? (language === "ar" ? "تشغيل الحركة" : "Resume animations")
    : (language === "ar" ? "إيقاف الحركة" : "Pause animations");
  return (
    <Button variant="ghost" size="icon" onClick={toggleAnimationsPaused} aria-label={label} title={label} className="h-9 w-9">
      {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
    </Button>
  );
};

export default MotionToggle;
