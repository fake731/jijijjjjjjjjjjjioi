import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

const PlaceholderTab = ({ title }: { title: string }) => {
  return (
    <Card className="border-border/30 bg-card/80">
      <CardContent className="p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
          <Settings className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">هذه الميزة قيد التطوير وستكون متاحة قريباً</p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderTab;
