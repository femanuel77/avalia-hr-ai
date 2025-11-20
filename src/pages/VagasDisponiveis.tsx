import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCandidaturas } from '@/contexts/CandidaturasContext';
import { vagasData } from '@/data/vagasData';
import {
  Briefcase,
  Calendar,
  Building2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function VagasDisponiveis() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isCandidatado } = useCandidaturas();

  const vagasAbertas = vagasData.filter(v => v.status === 'aberta');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Vagas Disponíveis</h1>
        </div>
        <p className="text-muted-foreground">
          Explore as oportunidades e candidate-se às vagas
        </p>
      </div>

      {vagasAbertas.length === 0 ? (
        <Card className="p-12 text-center animate-fade-in">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Nenhuma vaga disponível</h2>
          <p className="text-muted-foreground">
            No momento não há vagas abertas. Volte mais tarde!
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {vagasAbertas.map((vaga, index) => {
            const jaCandidatado = currentUser?.tipo === 'candidato' && isCandidatado(vaga.id);
            
            return (
              <Card
                key={vaga.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/vagas-disponiveis/${vaga.id}`)}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{vaga.nomeVaga}</h3>
                        {jaCandidatado && (
                          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                            <CheckCircle className="h-3 w-3" />
                            Candidatado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Building2 className="h-4 w-4" />
                        <span>{vaga.empresaNome}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {vaga.descricao.split('\n')[0]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {vaga.requisitos.slice(0, 4).map((req, idx) => (
                        <Badge key={idx} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                      {vaga.requisitos.length > 4 && (
                        <Badge variant="secondary">
                          +{vaga.requisitos.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Prazo: {formatDate(vaga.prazoInscricao)}</span>
                    </div>
                  </div>

                  <Button variant="default" className="gap-2 lg:self-start">
                    Ver Vaga
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
