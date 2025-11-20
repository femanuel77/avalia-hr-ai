import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';

// Dados mockados de candidatos
const candidatosMock: Record<string, any> = {
  '1': {
    id: '1',
    nome: 'Ana Silva',
    email: 'ana.silva@email.com',
    celular: '(11) 98765-4321',
    dataNascimento: '1995-03-15',
    formacoes: [
      {
        nivel: 'Graduação',
        nomeCurso: 'Ciência da Computação',
        anoInicio: '2014',
        anoFim: '2018',
        instituicao: 'USP',
      },
    ],
    experiencias: [
      {
        cargo: 'Desenvolvedora Full Stack',
        empresa: 'Tech Corp',
        periodo: '01/2019 - Atual',
        atividades: 'Desenvolvimento de aplicações web com React e Node.js, manutenção de APIs RESTful',
      },
    ],
    idiomas: [
      { idioma: 'Inglês', nivel: 'Avançado' },
      { idioma: 'Espanhol', nivel: 'Intermediário' },
    ],
    softSkills: ['Comunicação', 'Trabalho em equipe', 'Resolução de problemas', 'Criatividade'],
    discProfile: { D: 75, I: 85, S: 60, C: 70 },
    scoreIA: 92,
  },
  '2': {
    id: '2',
    nome: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    celular: '(11) 91234-5678',
    dataNascimento: '1992-08-22',
    formacoes: [
      {
        nivel: 'Graduação',
        nomeCurso: 'Design Gráfico',
        anoInicio: '2011',
        anoFim: '2015',
        instituicao: 'FAAP',
      },
    ],
    experiencias: [
      {
        cargo: 'UX/UI Designer',
        empresa: 'Design Studio',
        periodo: '03/2016 - Atual',
        atividades: 'Criação de interfaces, prototipagem, testes de usabilidade',
      },
    ],
    idiomas: [
      { idioma: 'Inglês', nivel: 'Fluente' },
    ],
    softSkills: ['Criatividade', 'Empatia', 'Comunicação', 'Atenção aos detalhes'],
    discProfile: { D: 55, I: 90, S: 75, C: 65 },
    scoreIA: 88,
  },
  '3': {
    id: '3',
    nome: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    celular: '(21) 98888-7777',
    dataNascimento: '1994-11-10',
    formacoes: [
      {
        nivel: 'Mestrado',
        nomeCurso: 'Estatística',
        anoInicio: '2017',
        anoFim: '2019',
        instituicao: 'UFRJ',
      },
    ],
    experiencias: [
      {
        cargo: 'Analista de Dados',
        empresa: 'DataCorp',
        periodo: '06/2019 - Atual',
        atividades: 'Análise de dados, criação de dashboards, modelagem preditiva',
      },
    ],
    idiomas: [
      { idioma: 'Inglês', nivel: 'Avançado' },
      { idioma: 'Francês', nivel: 'Básico' },
    ],
    softSkills: ['Análise crítica', 'Organização', 'Atenção aos detalhes', 'Resolução de problemas'],
    discProfile: { D: 80, I: 50, S: 55, C: 95 },
    scoreIA: 94,
  },
};

export default function Candidatos() {
  const { vagaId, candidatoId } = useParams();
  const navigate = useNavigate();

  const candidato = candidatosMock[candidatoId || ''];

  if (!candidato) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Candidato não encontrado</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const discData = [
    { subject: 'Dominância', value: candidato.discProfile.D },
    { subject: 'Influência', value: candidato.discProfile.I },
    { subject: 'Estabilidade', value: candidato.discProfile.S },
    { subject: 'Conformidade', value: candidato.discProfile.C },
  ];

  const handleAprovar = () => {
    toast({
      title: 'Candidato aprovado!',
      description: `${candidato.nome} foi aprovado para a próxima fase.`,
    });
  };

  const handleRejeitar = () => {
    toast({
      title: 'Candidato rejeitado',
      description: `${candidato.nome} foi removido do processo seletivo.`,
      variant: 'destructive',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(`/vagas/${vagaId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{candidato.nome}</h1>
          <p className="text-muted-foreground">Perfil do Candidato</p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-primary">{candidato.scoreIA}</span>
          <span className="text-sm text-muted-foreground">Score IA</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informações Pessoais */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{candidato.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{candidato.celular}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(candidato.dataNascimento).toLocaleDateString('pt-BR')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Formação */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Formação Acadêmica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidato.formacoes.map((formacao: any, index: number) => (
              <div key={index} className="space-y-1">
                <p className="font-medium">{formacao.nomeCurso}</p>
                <p className="text-sm text-muted-foreground">{formacao.instituicao}</p>
                <p className="text-sm text-muted-foreground">
                  {formacao.anoInicio} - {formacao.anoFim}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Idiomas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidato.idiomas.map((idioma: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{idioma.idioma}</span>
                <Badge variant="outline">{idioma.nivel}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Perfil DISC */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Análise Comportamental DISC</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={discData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Radar
                  name="Perfil"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {candidato.softSkills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiência Profissional */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Experiência Profissional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidato.experiencias.map((exp: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{exp.cargo}</h3>
                  <p className="text-sm text-muted-foreground">{exp.empresa}</p>
                </div>
                <Badge variant="outline">{exp.periodo}</Badge>
              </div>
              <p className="text-sm">{exp.atividades}</p>
              {index < candidato.experiencias.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ações */}
      <Card className="shadow-card bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-end">
            <Button variant="outline" size="lg" onClick={handleRejeitar} className="gap-2">
              <XCircle className="h-5 w-5" />
              Rejeitar Candidato
            </Button>
            <Button size="lg" onClick={handleAprovar} className="gap-2 bg-gradient-ai hover:opacity-90">
              <CheckCircle className="h-5 w-5" />
              Aprovar para Próxima Fase
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
