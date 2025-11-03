import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
  Award,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: "15.000+", label: "Candidatos Analisados", color: "text-primary" },
    { icon: Clock, value: "75%", label: "Redução no Tempo", color: "text-secondary" },
    { icon: Target, value: "92%", label: "Taxa de Precisão", color: "text-primary" },
    { icon: TrendingUp, value: "3.5x", label: "ROI Médio", color: "text-secondary" },
  ];

  const features = [
    {
      icon: Brain,
      title: "IA Avançada",
      description: "Análise inteligente de currículos com processamento de linguagem natural",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: BarChart3,
      title: "Teste DISC",
      description: "Avaliação comportamental completa e automatizada",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Zap,
      title: "Triagem Rápida",
      description: "Reduza semanas de trabalho para minutos",
      gradient: "from-primary-glow to-secondary",
    },
  ];

  const effectiveness = [
    { metric: "87%", label: "Dos candidatos aprovados pela IA se destacam nas entrevistas" },
    { metric: "60%", label: "Redução no tempo médio de contratação" },
    { metric: "94%", label: "Taxa de satisfação dos recrutadores com a plataforma" },
    { metric: "4.8/5", label: "Avaliação média dos usuários" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <Badge className="mb-6 bg-gradient-ai text-white border-0 shadow-glow">
              <Sparkles className="mr-1 h-3 w-3" />
              Recrutamento Inteligente
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Revolucione seu
              <span className="bg-gradient-ai bg-clip-text text-transparent"> Processo Seletivo</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              A Aval.IA utiliza Inteligência Artificial para automatizar a triagem de currículos e análise
              comportamental DISC, economizando até 75% do tempo em recrutamento.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="gap-2 bg-gradient-ai text-lg shadow-glow hover:opacity-90 animate-pulse-glow"
                onClick={() => navigate("/dashboard")}
              >
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Ver Demonstração
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="group border-0 bg-card/50 backdrop-blur transition-all hover:shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.color} transition-transform group-hover:scale-110`} />
                  <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Tecnologia que <span className="text-primary">Transforma</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas poderosas para otimizar cada etapa do seu processo de recrutamento
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-card transition-all hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 transition-opacity group-hover:opacity-10`} />
                <CardContent className="relative p-8">
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-ai p-3 shadow-glow">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Effectiveness Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              <Award className="mr-1 h-3 w-3" />
              Resultados Comprovados
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Dados que <span className="text-secondary">Convencem</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Empresas que utilizam a Aval.IA reportam melhorias significativas em seus processos de contratação
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              {effectiveness.map((item, index) => (
                <Card
                  key={index}
                  className="group border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-card transition-all hover:border-primary/40 hover:shadow-glow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                      <div className="text-4xl font-bold text-primary">{item.metric}</div>
                    </div>
                    <p className="text-lg text-foreground/80">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <Card className="border-0 bg-gradient-ai shadow-glow">
              <CardContent className="p-12">
                <h3 className="mb-4 text-3xl font-bold text-white">Pronto para Transformar seu RH?</h3>
                <p className="mb-8 text-lg text-white/90">
                  Junte-se a centenas de empresas que já economizam tempo e contratam melhor com a Aval.IA
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Iniciar Teste Gratuito
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
