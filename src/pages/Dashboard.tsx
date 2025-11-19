import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, TrendingUp, Clock, Sparkles } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DISCChart } from "@/components/dashboard/DISCChart";
import { RecruitmentFunnel } from "@/components/dashboard/RecruitmentFunnel";
import { RetentionChart } from "@/components/dashboard/RetentionChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showRetentionChart, setShowRetentionChart] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Visão geral do sistema de recrutamento inteligente</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vagas Abertas"
          value={12}
          subtitle="3 novas esta semana"
          icon={Briefcase}
          trend="up"
          trendValue="25%"
          onClick={() => navigate('/vagas')}
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
          onClick={() => setShowRetentionChart(true)}
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

      <RetentionChart 
        open={showRetentionChart} 
        onOpenChange={setShowRetentionChart} 
      />
    </div>
  );
}
