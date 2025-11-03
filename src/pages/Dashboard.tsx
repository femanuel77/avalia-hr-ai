import { Briefcase, Users, TrendingUp, Clock } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DISCChart } from "@/components/dashboard/DISCChart";
import { RecruitmentFunnel } from "@/components/dashboard/RecruitmentFunnel";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema de recrutamento inteligente
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vagas Abertas"
          value={12}
          subtitle="3 novas esta semana"
          icon={Briefcase}
          trend="up"
          trendValue="25%"
        />
        <MetricCard
          title="Candidatos Ativos"
          value={247}
          subtitle="No funil de recrutamento"
          icon={Users}
          trend="up"
          trendValue="12%"
        />
        <MetricCard
          title="Taxa de Retenção"
          value="87%"
          subtitle="Últimos 6 meses"
          icon={TrendingUp}
          trend="up"
          trendValue="5%"
        />
        <MetricCard
          title="Economia de Tempo"
          value="142h"
          subtitle="Automatização IA este mês"
          icon={Clock}
          trend="up"
          trendValue="18h"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DISCChart />
        <RecruitmentFunnel />
      </div>
    </div>
  );
}
