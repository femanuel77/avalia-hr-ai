import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  onClick?: () => void;
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, trendValue, onClick }: MetricCardProps) {
  return (
    <Card 
      className={`shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trendValue && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs font-medium ${trend === "up" ? "text-accent" : "text-destructive"}`}>
                  {trend === "up" ? "↑" : "↓"} {trendValue}
                </span>
                <span className="text-xs text-muted-foreground">vs. mês anterior</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-ai">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
