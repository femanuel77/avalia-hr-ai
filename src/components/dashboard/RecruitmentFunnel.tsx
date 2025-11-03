import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funnelStages = [
  { name: "Triagem Inicial", count: 247, percentage: 100, color: "bg-primary" },
  { name: "Teste DISC", count: 189, percentage: 76, color: "bg-accent" },
  { name: "Entrevista", count: 94, percentage: 38, color: "bg-secondary" },
  { name: "Contratado", count: 31, percentage: 13, color: "bg-gradient-ai" },
];

export function RecruitmentFunnel() {
  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funil de Recrutamento</CardTitle>
        <p className="text-sm text-muted-foreground">Conversão de candidatos por etapa</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stage.name}</span>
                <span className="text-muted-foreground">
                  {stage.count} candidatos ({stage.percentage}%)
                </span>
              </div>
              <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                <div
                  className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-center`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-xs font-medium text-white px-2">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
