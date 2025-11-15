import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Sparkles, ArrowRight, ArrowLeft, Plus, X, Target, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { discQuestions, DISCOption } from '@/data/discQuestions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { formatCPF, formatPhone } from '@/lib/masks';

const softSkillsOptions = [
  'Comunicação', 'Trabalho em equipe', 'Liderança', 'Proatividade', 
  'Resolução de problemas', 'Criatividade', 'Adaptabilidade', 'Gestão de tempo',
  'Pensamento crítico', 'Inteligência emocional', 'Ferramentas de escritório'
];

export default function Cadastro() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    celular: '',
    senha: '',
    confirmSenha: ''
  });

  const [formacoes, setFormacoes] = useState([
    { nivel: '', nomeCurso: '', anoInicio: '', anoFim: '', instituicao: '' }
  ]);
  const [formacoesComplementares, setFormacoesComplementares] = useState<Array<{ nome: string; ano: string; instituicao: string }>>([]);
  const [idiomas, setIdiomas] = useState<Array<{ idioma: string; nivel: string }>>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  const [step, setStep] = useState(1);
  const [showDISCIntro, setShowDISCIntro] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [discScores, setDiscScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [shuffledOptions, setShuffledOptions] = useState<DISCOption[][]>([]);

  const handleStep1Next = () => {
    if (!formData.cpf || !formData.nome || !formData.sobrenome || !formData.dataNascimento || 
        !formData.email || !formData.celular || !formData.senha || !formData.confirmSenha) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.senha !== formData.confirmSenha) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    if (formData.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setStep(2);
  };

  const handleStep2Next = () => {
    const hasFormacao = formacoes.some(f => f.nivel && f.nomeCurso && f.anoInicio && f.anoFim && f.instituicao);
    if (!hasFormacao) {
      toast.error('Preencha pelo menos uma formação');
      return;
    }
    
    if (softSkills.length === 0) {
      toast.error('Adicione pelo menos uma soft skill');
      return;
    }
    
    setShowDISCIntro(true);
  };

  const startDISCTest = () => {
    const shuffled = discQuestions.map(options => 
      [...options].sort(() => Math.random() - 0.5)
    );
    setShuffledOptions(shuffled);
    setShowDISCIntro(false);
    setStep(3);
  };

  const handleDISCAnswer = (option: DISCOption) => {
    setDiscScores(prev => ({ ...prev, [option.type]: prev[option.type] + 1 }));
    
    if (currentQuestion < discQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finalizeCadastro();
    }
  };

  const finalizeCadastro = async () => {
    const userData = {
      tipo: 'candidato' as const,
      email: formData.email,
      cpf: formData.cpf,
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      dataNascimento: formData.dataNascimento,
      celular: formData.celular,
      formacoes,
      formacoesComplementares,
      idiomas,
      softSkills,
      discProfile: discScores
    };
    
    const success = await register(userData, formData.senha);
    
    if (success) {
      toast.success('Cadastro realizado com sucesso!');
      navigate('/perfil');
    } else {
      toast.error('Email já cadastrado');
    }
  };

  const addFormacao = () => {
    setFormacoes([...formacoes, { nivel: '', nomeCurso: '', anoInicio: '', anoFim: '', instituicao: '' }]);
  };

  const removeFormacao = (index: number) => {
    if (formacoes.length > 1) {
      setFormacoes(formacoes.filter((_, i) => i !== index));
    }
  };

  const updateFormacao = (index: number, field: string, value: string) => {
    const newFormacoes = [...formacoes];
    newFormacoes[index] = { ...newFormacoes[index], [field]: value };
    setFormacoes(newFormacoes);
  };

  const addFormacaoComplementar = () => {
    setFormacoesComplementares([...formacoesComplementares, { nome: '', ano: '', instituicao: '' }]);
  };

  const removeFormacaoComplementar = (index: number) => {
    setFormacoesComplementares(formacoesComplementares.filter((_, i) => i !== index));
  };

  const updateFormacaoComplementar = (index: number, field: string, value: string) => {
    const newFormacoes = [...formacoesComplementares];
    newFormacoes[index] = { ...newFormacoes[index], [field]: value };
    setFormacoesComplementares(newFormacoes);
  };

  const addIdioma = () => {
    setIdiomas([...idiomas, { idioma: '', nivel: '' }]);
  };

  const removeIdioma = (index: number) => {
    setIdiomas(idiomas.filter((_, i) => i !== index));
  };

  const updateIdioma = (index: number, field: string, value: string) => {
    const newIdiomas = [...idiomas];
    newIdiomas[index] = { ...newIdiomas[index], [field]: value };
    setIdiomas(newIdiomas);
  };

  const toggleSoftSkill = (skill: string) => {
    setSoftSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  if (showDISCIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
        <Card className="w-full max-w-2xl p-8 shadow-card animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-ai flex items-center justify-center shadow-glow">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">A próxima etapa é o Teste DISC</h1>
          </div>

          <div className="space-y-6">
            <div className="flex gap-3">
              <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">🎯 Finalidade do Teste</h3>
                <p className="text-muted-foreground">
                  O Teste DISC é uma ferramenta de avaliação comportamental que nos ajuda a entender suas preferências e tendências de comportamento no ambiente de trabalho (Dominância, Influência, Estabilidade e Conformidade).
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">✅ Orientação</h3>
                <p className="text-muted-foreground">
                  Não há respostas certas ou erradas. Seja honesto(a) e escolha a alternativa que mais combina com você no seu dia a dia profissional.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">🛑 Importante</h3>
                <p className="text-muted-foreground">
                  O Teste DISC não é eliminatório. Ele é apenas uma ferramenta complementar para analisar e compreender melhor o seu perfil, auxiliando-nos a identificar a melhor adequação à função e à nossa cultura.
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={startDISCTest}
            className="w-full mt-8 gap-2 bg-gradient-ai shadow-glow hover:opacity-90 transition-all"
          >
            Começar Teste
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <Card className="w-full max-w-3xl p-8 shadow-card animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-ai flex items-center justify-center shadow-glow">
              <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse-glow" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cadastro de Candidato</h1>
          <p className="text-muted-foreground">
            {step === 1 && "Etapa 1/3 - Informações Pessoais"}
            {step === 2 && "Etapa 2/3 - Informações Profissionais"}
            {step === 3 && "Etapa 3/3 - Teste DISC"}
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome *</Label>
                <Input
                  id="sobrenome"
                  value={formData.sobrenome}
                  onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular *</Label>
              <Input
                id="celular"
                value={formData.celular}
                onChange={(e) => setFormData({...formData, celular: formatPhone(e.target.value)})}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmSenha">Confirmar Senha *</Label>
                <Input
                  id="confirmSenha"
                  type="password"
                  value={formData.confirmSenha}
                  onChange={(e) => setFormData({...formData, confirmSenha: e.target.value})}
                  required
                />
              </div>
            </div>

            <Button onClick={handleStep1Next} className="w-full gap-2">
              Próximo
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg">Formações Acadêmicas *</Label>
                <Button onClick={addFormacao} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              
              {formacoes.map((formacao, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">Formação {index + 1}</h4>
                    {formacoes.length > 1 && (
                      <Button onClick={() => removeFormacao(index)} variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Select value={formacao.nivel} onValueChange={(v) => updateFormacao(index, 'nivel', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nível de formação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medio">Ensino Médio</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="graduacao">Graduação</SelectItem>
                        <SelectItem value="pos">Pós-graduação</SelectItem>
                        <SelectItem value="mestrado">Mestrado</SelectItem>
                        <SelectItem value="doutorado">Doutorado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Nome do curso"
                      value={formacao.nomeCurso}
                      onChange={(e) => updateFormacao(index, 'nomeCurso', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Ano início"
                        value={formacao.anoInicio}
                        onChange={(e) => updateFormacao(index, 'anoInicio', e.target.value)}
                      />
                      <Input
                        placeholder="Ano fim"
                        value={formacao.anoFim}
                        onChange={(e) => updateFormacao(index, 'anoFim', e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Instituição"
                      value={formacao.instituicao}
                      onChange={(e) => updateFormacao(index, 'instituicao', e.target.value)}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg">Formações Complementares</Label>
                <Button onClick={addFormacaoComplementar} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              
              {formacoesComplementares.map((formacao, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">Curso {index + 1}</h4>
                    <Button onClick={() => removeFormacaoComplementar(index)} variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      placeholder="Nome do curso"
                      value={formacao.nome}
                      onChange={(e) => updateFormacaoComplementar(index, 'nome', e.target.value)}
                    />
                    <Input
                      placeholder="Ano"
                      value={formacao.ano}
                      onChange={(e) => updateFormacaoComplementar(index, 'ano', e.target.value)}
                    />
                    <Input
                      placeholder="Instituição"
                      value={formacao.instituicao}
                      onChange={(e) => updateFormacaoComplementar(index, 'instituicao', e.target.value)}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Label className="text-lg">Idiomas</Label>
                <Button onClick={addIdioma} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              
              {idiomas.map((idioma, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">Idioma {index + 1}</h4>
                    <Button onClick={() => removeIdioma(index)} variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Idioma"
                      value={idioma.idioma}
                      onChange={(e) => updateIdioma(index, 'idioma', e.target.value)}
                    />
                    <Select value={idioma.nivel} onValueChange={(v) => updateIdioma(index, 'nivel', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="fluente">Fluente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <Label className="text-lg mb-3 block">Soft Skills *</Label>
              <div className="flex flex-wrap gap-2">
                {softSkillsOptions.map(skill => (
                  <Badge
                    key={skill}
                    variant={softSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer transition-all"
                    onClick={() => toggleSoftSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button onClick={handleStep2Next} className="flex-1 gap-2">
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && shuffledOptions.length > 0 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Questão {currentQuestion + 1} de {discQuestions.length}</span>
                <span className="text-sm text-muted-foreground">{Math.round((currentQuestion / discQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-ai h-2 rounded-full transition-all"
                  style={{ width: `${(currentQuestion / discQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <p className="text-lg font-medium mb-6 text-center">
                Escolha a alternativa que mais combina com você:
              </p>
              
              <div className="space-y-3">
                {shuffledOptions[currentQuestion]?.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleDISCAnswer(option)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-6 hover:border-primary transition-all"
                  >
                    <span className="mr-3 font-bold text-primary">{String.fromCharCode(65 + index)}.</span>
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
