import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { User, GraduationCap, Languages, Sparkles, Brain, Award, Mail, Phone, Calendar, LogOut, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Você precisa estar logado para ver seu perfil.</p>
          <Link to="/login">
            <Button>Fazer Login</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (currentUser.tipo === 'empregador') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-ai flex items-center justify-center">
              <Building2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{currentUser.nomeEmpresa}</h1>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Informações da Empresa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">CNPJ</p>
                  <p className="font-medium">{currentUser.cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{currentUser.telefone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="font-medium">{currentUser.endereco}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Candidato profile
  const discData = [
    { caracteristica: 'Dominância', value: (currentUser.discProfile.D / 40) * 100 },
    { caracteristica: 'Influência', value: (currentUser.discProfile.I / 40) * 100 },
    { caracteristica: 'Estabilidade', value: (currentUser.discProfile.S / 40) * 100 },
    { caracteristica: 'Conformidade', value: (currentUser.discProfile.C / 40) * 100 },
  ];

  const getDominantProfile = () => {
    const profiles = [
      { name: 'Dominância', value: currentUser.discProfile.D, description: 'Orientado a resultados, direto e assertivo' },
      { name: 'Influência', value: currentUser.discProfile.I, description: 'Sociável, comunicativo e entusiasta' },
      { name: 'Estabilidade', value: currentUser.discProfile.S, description: 'Paciente, leal e cooperativo' },
      { name: 'Conformidade', value: currentUser.discProfile.C, description: 'Analítico, preciso e sistemático' },
    ];
    return profiles.sort((a, b) => b.value - a.value)[0];
  };

  const dominantProfile = getDominantProfile();
  const initials = `${currentUser.nome[0]}${currentUser.sobrenome[0]}`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/perfil/editar')} variant="outline">
              Editar Perfil
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">Suas informações e análise comportamental</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 p-6 shadow-card animate-fade-in">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary shadow-glow">
              <AvatarFallback className="text-2xl bg-gradient-ai text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-bold">{currentUser.nome} {currentUser.sobrenome}</h2>
            </div>

            <div className="w-full pt-4 border-t space-y-3 text-sm text-left">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{currentUser.celular}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{new Date(currentUser.dataNascimento).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="w-full pt-4 border-t">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-sm font-medium text-muted-foreground">Perfil Dominante</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-ai bg-clip-text text-transparent">
                {dominantProfile.name}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{dominantProfile.description}</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 shadow-card space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Análise DISC - Perfil Comportamental
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
                    <span className="text-muted-foreground">{Math.round(item.value)}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Formação Acadêmica
          </h3>
          <div className="space-y-3">
            {currentUser.formacoes.map((formacao, idx) => (
              <div key={idx} className="border-l-2 border-primary pl-4">
                <Badge variant="outline" className="mb-1">{formacao.nivel}</Badge>
                <p className="font-medium">{formacao.nomeCurso}</p>
                <p className="text-sm text-muted-foreground">{formacao.instituicao}</p>
                <p className="text-sm text-muted-foreground">{formacao.anoInicio} - {formacao.anoFim}</p>
              </div>
            ))}
          </div>

          {currentUser.formacoesComplementares && currentUser.formacoesComplementares.length > 0 && (
            <>
              <h4 className="text-md font-semibold mt-6 mb-3">Cursos Complementares</h4>
              <div className="space-y-2">
                {currentUser.formacoesComplementares.map((curso, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-medium">{curso.nome}</p>
                    <p className="text-muted-foreground">{curso.instituicao} • {curso.ano}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            Idiomas
          </h3>
          {currentUser.idiomas && currentUser.idiomas.length > 0 ? (
            <div className="space-y-3 mb-6">
              {currentUser.idiomas.map((idioma, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-medium">{idioma.idioma}</span>
                  <Badge variant="outline" className="border-primary text-primary">{idioma.nivel}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-6">Nenhum idioma cadastrado</p>
          )}

          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-secondary" />
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.softSkills.map((skill, idx) => (
              <Badge key={idx} className="bg-gradient-ai">{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>

      {currentUser.experiencias && currentUser.experiencias.length > 0 && (
        <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Experiências Profissionais
          </h3>
          <div className="space-y-4">
            {currentUser.experiencias.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-primary pl-4">
                <p className="font-bold text-lg">{exp.cargo}</p>
                <p className="font-medium text-muted-foreground">{exp.empresa}</p>
                <p className="text-sm text-muted-foreground mb-2">{exp.periodo}</p>
                <p className="text-sm">{exp.atividades}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
