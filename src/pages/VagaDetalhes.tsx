import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import { useAuth } from '@/contexts/AuthContext';
import { useCandidaturas } from '@/contexts/CandidaturasContext';
import { vagasData } from '@/data/vagasData';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Instagram,
  MessageCircle,
  CheckCircle,
  Clock,
  UserCheck,
  Video,
  Users,
  Flag,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const statusSteps = [
  { key: 'inscricao', label: 'Inscrição', icon: CheckCircle },
  { key: 'analise', label: 'Análise de Currículo', icon: UserCheck },
  { key: 'entrevista-online', label: 'Entrevista Online', icon: Video },
  { key: 'entrevista-presencial', label: 'Entrevista Presencial', icon: Users },
  { key: 'finalizacao', label: 'Finalização', icon: Flag },
];

export default function VagaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { candidatarVaga, removerCandidatura, isCandidatado, getCandidatura } = useCandidaturas();

  const vaga = vagasData.find(v => v.id === id);

  if (!vaga) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vaga não encontrada</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const candidatado = isCandidatado(vaga.id);
  const candidatura = getCandidatura(vaga.id);
  const isCandidato = currentUser?.tipo === 'candidato';

  const handleCandidatar = () => {
    if (!currentUser) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para se candidatar a uma vaga.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    candidatarVaga(vaga);
    toast({
      title: "Candidatura realizada!",
      description: "Sua candidatura foi enviada com sucesso.",
    });
  };

  const handleRemoverCandidatura = () => {
    removerCandidatura(vaga.id);
    toast({
      title: "Candidatura removida",
      description: "Sua candidatura foi removida com sucesso.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getCurrentStepIndex = () => {
    if (!candidatura) return -1;
    return statusSteps.findIndex(step => step.key === candidatura.status);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{vaga.nomeVaga}</h1>
        </div>
      </div>

      {/* Informações principais */}
      <Card className="p-6 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-5 w-5" />
              <span className="text-lg font-medium text-foreground">{vaga.empresaNome}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Criada em {formatDate(vaga.dataCriacao)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Prazo: {formatDate(vaga.prazoInscricao)}</span>
              </div>
            </div>

            <Badge
              variant={vaga.status === "aberta" ? "default" : "secondary"}
              className={
                vaga.status === "aberta"
                  ? "bg-gradient-ai border-0 shadow-glow"
                  : "bg-muted text-muted-foreground"
              }
            >
              {vaga.status === "aberta" ? "Ativa" : "Encerrada"}
            </Badge>
          </div>

          {/* Botão de candidatura (apenas para candidatos) */}
          {isCandidato && vaga.status === "aberta" && (
            <div className="flex flex-col gap-2">
              {!candidatado ? (
                <Button
                  size="lg"
                  className="bg-gradient-ai hover:opacity-90 shadow-glow"
                  onClick={handleCandidatar}
                >
                  Candidatar-se
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" variant="destructive">
                      Remover Candidatura
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você tem certeza que deseja desistir desta candidatura? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRemoverCandidatura}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Status da candidatura (timeline) */}
      {isCandidato && candidatado && candidatura && (
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-semibold mb-6">Status da Candidatura</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const currentStep = getCurrentStepIndex();
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="relative flex items-center gap-4">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-muted-foreground'
                      } ${isCurrent ? 'shadow-glow' : ''}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-primary">Etapa atual</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Descrição da vaga */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-semibold mb-4">Descrição da Vaga</h2>
        <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
          {vaga.descricao}
        </div>
      </Card>

      {/* Informações de contato (apenas para candidatos) */}
      {isCandidato && (
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaga.contato.email && (
              <a
                href={`mailto:${vaga.contato.email}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">{vaga.contato.email}</p>
                </div>
              </a>
            )}
            
            {vaga.contato.telefone && (
              <a
                href={`tel:${vaga.contato.telefone}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{vaga.contato.telefone}</p>
                </div>
              </a>
            )}
            
            {vaga.contato.whatsapp && (
              <a
                href={`https://wa.me/${vaga.contato.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{vaga.contato.whatsapp}</p>
                </div>
              </a>
            )}
            
            {vaga.contato.website && (
              <a
                href={vaga.contato.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <p className="text-sm text-muted-foreground">Visite nosso site</p>
                </div>
              </a>
            )}
            
            {vaga.contato.linkedin && (
              <a
                href={vaga.contato.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">Siga-nos</p>
                </div>
              </a>
            )}
            
            {vaga.contato.instagram && (
              <a
                href={vaga.contato.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Instagram</p>
                  <p className="text-sm text-muted-foreground">Siga-nos</p>
                </div>
              </a>
            )}
          </div>

          {/* Segundo botão de candidatura */}
          {vaga.status === "aberta" && !candidatado && (
            <>
              <Separator className="my-6" />
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-ai hover:opacity-90 shadow-glow"
                  onClick={handleCandidatar}
                >
                  Candidatar-se à vaga
                </Button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
