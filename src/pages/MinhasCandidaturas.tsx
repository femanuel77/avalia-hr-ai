import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCandidaturas } from '@/contexts/CandidaturasContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Briefcase,
  Calendar,
  Building2,
  ArrowRight,
  Clock,
} from 'lucide-react';

export default function MinhasCandidaturas() {
  const navigate = useNavigate();
  const { candidaturas } = useCandidaturas();
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.tipo !== 'candidato') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso negado</h1>
          <p className="text-muted-foreground mb-4">
            Você precisa estar logado como candidato para acessar esta página.
          </p>
          <Button onClick={() => navigate('/login')}>Fazer Login</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      inscricao: 'Inscrição',
      analise: 'Análise de Currículo',
      'entrevista-online': 'Entrevista Online',
      'entrevista-presencial': 'Entrevista Presencial',
      finalizacao: 'Finalização',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      inscricao: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      analise: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'entrevista-online': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'entrevista-presencial': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      finalizacao: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Minhas Candidaturas</h1>
        </div>
        <p className="text-muted-foreground">
          Acompanhe o status das suas candidaturas
        </p>
      </div>

      {candidaturas.length === 0 ? (
        <Card className="p-12 text-center animate-fade-in">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Nenhuma candidatura ainda</h2>
          <p className="text-muted-foreground mb-6">
            Você ainda não se candidatou a nenhuma vaga. Explore as vagas disponíveis!
          </p>
          <Button onClick={() => navigate('/vagas-disponiveis')}>//
            Ver Vagas Disponíveis
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {candidaturas.map((candidatura, index) => (
            <Card
              key={candidatura.vagaId}
              className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/vagas-disponiveis/${candidatura.vagaId}`)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {candidatura.vaga.nomeVaga}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{candidatura.vaga.empresaNome}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Candidatura: {formatDate(candidatura.dataCandidatura)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Prazo: {formatDate(candidatura.vaga.prazoInscricao)}</span>
                    </div>
                  </div>

                  <Badge className={getStatusColor(candidatura.status)}>
                    {getStatusLabel(candidatura.status)}
                  </Badge>
                </div>

                <Button variant="ghost" className="gap-2">
                  Ver Detalhes
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
