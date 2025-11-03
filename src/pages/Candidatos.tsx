import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ArrowLeft, ThumbsUp, ThumbsDown, Sparkles, User, Brain, Award, Briefcase, Mail, Phone, MapPin } from "lucide-react";

const candidato = {
  nome: "Ana Silva Santos",
  cargo: "Desenvolvedor Full Stack",
  scoreIA: 8.7,
  email: "ana.silva@email.com",
  telefone: "(11) 98765-4321",
  experiencia: "5 anos",
};

const discData = [
  { caracteristica: "Dominância", value: 75 },
  { caracteristica: "Influência", value: 60 },
  { caracteristica: "Estabilidade", value: 85 },
  { caracteristica: "Conformidade", value: 70 },
];

const competencias = [
  { nome: "React & TypeScript", nivel: 90 },
  { nome: "Node.js & APIs", nivel: 85 },
  { nome: "Bancos de Dados", nivel: 75 },
  { nome: "DevOps & Cloud", nivel: 70 },
];

export default function Candidatos() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Perfil do Candidato</h1>
        </div>
        <p className="text-muted-foreground mb-4">Análise detalhada e resultados do processo seletivo</p>
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para lista
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 p-6 shadow-card animate-fade-in">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary shadow-glow">
              <AvatarFallback className="text-2xl bg-gradient-ai text-primary-foreground">
                AS
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-bold">{candidato.nome}</h2>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <Briefcase className="h-3 w-3" />
                <p>{candidato.cargo}</p>
              </div>
            </div>

            <div className="w-full pt-4 border-t">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-sm font-medium text-muted-foreground">Score IA</span>
              </div>
              <div className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">
                {candidato.scoreIA}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Adequação à vaga</p>
            </div>

            <div className="w-full space-y-3 text-sm text-left pt-4 border-t">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{candidato.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{candidato.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{candidato.experiencia}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 shadow-card space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Análise DISC - Perfil Comportamental
              <Badge variant="secondary" className="ml-2">Completo</Badge>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={discData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="caracteristica"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <Radar
                  name="Perfil"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {discData.map((item) => (
                <div key={item.caracteristica} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.caracteristica}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              Competências Técnicas (Análise PLN)
            </h3>
            <div className="space-y-4">
              {competencias.map((comp) => (
                <div key={comp.nome} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{comp.nome}</span>
                    <Badge variant="outline" className="border-primary text-primary">
                      {comp.nivel}%
                    </Badge>
                  </div>
                  <Progress value={comp.nivel} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Resumo da Experiência
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Desenvolvedora Full Stack com sólida experiência em React, TypeScript e Node.js. 
          Demonstra forte capacidade de trabalho em equipe e liderança técnica. Histórico 
          comprovado de entrega de projetos complexos em ambientes ágeis. Especialista em 
          arquitetura de microsserviços e APIs RESTful. Certificações em AWS e desenvolvimento 
          cloud-native.
        </p>
        <div className="flex gap-3 pt-4 border-t">
          <Button className="flex-1 gap-2 bg-gradient-ai hover:opacity-90 shadow-glow">
            <ThumbsUp className="h-5 w-5" />
            Aprovar para Próxima Fase
          </Button>
          <Button variant="outline" className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <ThumbsDown className="h-5 w-5" />
            Rejeitar
          </Button>
        </div>
      </Card>
    </div>
  );
}
