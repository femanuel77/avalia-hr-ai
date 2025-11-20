import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const vagaSchema = z.object({
  nomeVaga: z.string().min(3, 'Nome da vaga deve ter pelo menos 3 caracteres'),
  prazoInscricao: z.string().min(1, 'Prazo de inscrição é obrigatório'),
  descricao: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  requisitos: z.string().min(10, 'Requisitos devem ter pelo menos 10 caracteres'),
  perfisDesejados: z.array(z.string()).min(1, 'Selecione pelo menos um perfil DISC'),
});

type VagaFormData = z.infer<typeof vagaSchema>;

export default function NovaVaga() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VagaFormData>({
    resolver: zodResolver(vagaSchema),
    defaultValues: {
      nomeVaga: '',
      prazoInscricao: '',
      descricao: '',
      requisitos: '',
      perfisDesejados: [],
    },
  });

  const onSubmit = async (data: VagaFormData) => {
    if (!currentUser || currentUser.tipo !== 'empregador') {
      toast({
        title: 'Acesso negado',
        description: 'Apenas empregadores podem criar vagas.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simular salvamento
    setTimeout(() => {
      const novaVaga = {
        id: Date.now().toString(),
        nomeVaga: data.nomeVaga,
        empresaId: currentUser.email,
        empresaNome: currentUser.nomeEmpresa,
        dataCriacao: new Date().toISOString(),
        prazoInscricao: data.prazoInscricao,
        descricao: data.descricao,
        requisitos: data.requisitos.split(',').map(r => r.trim()),
        perfisDesejados: data.perfisDesejados,
        status: 'aberta' as const,
        contato: {
          email: currentUser.email,
          telefone: currentUser.telefone,
          whatsapp: currentUser.whatsapp || currentUser.telefone,
          website: currentUser.website,
          linkedin: currentUser.linkedin,
          instagram: currentUser.instagram,
        },
      };

      // Salvar no localStorage
      const vagas = JSON.parse(localStorage.getItem('vagas_criadas') || '[]');
      vagas.push(novaVaga);
      localStorage.setItem('vagas_criadas', JSON.stringify(vagas));

      toast({
        title: 'Vaga criada com sucesso!',
        description: 'A vaga está agora disponível para candidaturas.',
      });

      setIsSubmitting(false);
      navigate('/vagas');
    }, 1000);
  };

  const perfisDisc = [
    { id: 'D', label: 'Dominância (D)', description: 'Direto, decidido, orientado a resultados' },
    { id: 'I', label: 'Influência (I)', description: 'Comunicativo, persuasivo, otimista' },
    { id: 'S', label: 'Estabilidade (S)', description: 'Calmo, paciente, leal' },
    { id: 'C', label: 'Conformidade (C)', description: 'Analítico, preciso, organizado' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/vagas')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Nova Vaga</h1>
          </div>
          <p className="text-muted-foreground">Crie uma nova vaga de emprego</p>
        </div>
      </div>

      <Card className="p-6 shadow-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nomeVaga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Vaga *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Desenvolvedor Full Stack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prazoInscricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo de Inscrição *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Data limite para candidaturas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Vaga *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as responsabilidades, benefícios e informações relevantes sobre a vaga..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requisitos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Liste os requisitos separados por vírgula (Ex: React, TypeScript, Node.js)"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separe os requisitos por vírgula
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="perfisDesejados"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Perfis DISC Desejados *</FormLabel>
                    <FormDescription>
                      Selecione os perfis comportamentais mais adequados para esta vaga
                    </FormDescription>
                  </div>
                  <div className="space-y-3">
                    {perfisDisc.map((perfil) => (
                      <FormField
                        key={perfil.id}
                        control={form.control}
                        name="perfisDesejados"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(perfil.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, perfil.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== perfil.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-medium">{perfil.label}</FormLabel>
                              <FormDescription>{perfil.description}</FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/vagas')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-ai hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando...' : 'Criar Vaga'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
