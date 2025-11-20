import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { vagasData, candidaturasMock } from '@/data/vagasData';
import {
  ArrowLeft,
  Building2,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  XCircle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const statusLabels: Record<string, string> = {
  'inscricao': 'Inscrição',
  'analise': 'Análise',
  'entrevista-online': 'Entrevista Online',
  'entrevista-presencial': 'Entrevista Presencial',
  'finalizacao': 'Finalização',
  'eliminado': 'Eliminado',
};

export default function VagaDetalhesEmpregador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vagaStatus, setVagaStatus] = useState<'aberta' | 'encerrada'>('aberta');

  const vaga = vagasData.find(v => v.id === id);
  const candidaturas = candidaturasMock.filter(c => c.vagaId === id);

  if (!vaga) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vaga não encontrada</h1>
          <Button onClick={() => navigate('/vagas')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleEncerrarVaga = () => {
    setVagaStatus('encerrada');
    toast({
      title: 'Vaga encerrada',
      description: 'A vaga foi encerrada e não receberá mais candidaturas.',
    });
  };

  const calcularScoreIA = (discProfile: any) => {
    // Calcular score baseado nos perfis desejados
    let score = 0;
    let count = 0;
    
    vaga.perfisDesejados.forEach(perfil => {
      score += discProfile[perfil];
      count++;
    });

    return count > 0 ? Math.round((score / count) * 0.9 + 10) : 75;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/vagas')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{vaga.nomeVaga}</h1>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={vagaStatus === 'encerrada'}>
              <XCircle className="mr-2 h-4 w-4" />
              Encerrar Vaga
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja encerrar esta vaga?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não poderá ser desfeita. A vaga será marcada como encerrada e não receberá mais candidaturas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleEncerrarVaga}>
                Encerrar Vaga
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Informações principais */}
      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{vaga.empresaNome}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Criada em {formatDate(vaga.dataCriacao)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Prazo: {formatDate(vaga.prazoInscricao)}
              </span>
            </div>
            <Badge 
              variant={vagaStatus === 'aberta' ? 'default' : 'secondary'}
              className={vagaStatus === 'aberta' ? 'bg-gradient-ai border-0' : ''}
            >
              {vagaStatus === 'aberta' ? 'Aberta' : 'Encerrada'}
            </Badge>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground whitespace-pre-line">{vaga.descricao}</p>
          </div>

          {vaga.requisitos.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
                <div className="flex flex-wrap gap-2">
                  {vaga.requisitos.map((req, index) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {vaga.perfisDesejados.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Perfis DISC Desejados</h3>
                <div className="flex flex-wrap gap-2">
                  {vaga.perfisDesejados.map((perfil, index) => (
                    <Badge key={index} variant="secondary">
                      {perfil}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Lista de Candidatos */}
      <Card className="shadow-card">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Candidatos ({candidaturas.length})</h2>
          </div>

          {candidaturas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum candidato se inscreveu ainda nesta vaga.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Data de Inscrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Score IA
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidaturas.map((candidatura) => (
                  <TableRow key={candidatura.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{candidatura.candidatoNome}</TableCell>
                    <TableCell className="text-muted-foreground">{candidatura.candidatoEmail}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(candidatura.dataInscricao)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={candidatura.status === 'eliminado' ? 'destructive' : 'outline'}
                      >
                        {statusLabels[candidatura.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">
                          {calcularScoreIA(candidatura.discProfile)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/vagas/${id}/candidatos/${candidatura.candidatoId}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Perfil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
}
