import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft, User, GraduationCap, Languages, Sparkles, Plus, Trash2 } from 'lucide-react';
import { discQuestions, DISCOption } from '@/data/discQuestions';
import { Badge } from '@/components/ui/badge';

const softSkillsOptions = [
  'Comunicação', 'Trabalho em equipe', 'Liderança', 'Proatividade', 
  'Resolução de problemas', 'Criatividade', 'Adaptabilidade', 'Gestão de tempo',
  'Pensamento crítico', 'Inteligência emocional', 'Ferramentas de escritório'
];

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Step 1
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2
  const [formacoes, setFormacoes] = useState([{ nivel: '', anoInicio: '', anoFim: '', instituicao: '' }]);
  const [formacoesComplementares, setFormacoesComplementares] = useState([{ nome: '', ano: '', instituicao: '' }]);
  const [idiomas, setIdiomas] = useState([{ idioma: '', nivel: '' }]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);

  // Step 3 - DISC Test
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [discScores, setDiscScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [shuffledOptions, setShuffledOptions] = useState<DISCOption[][]>([]);

  useState(() => {
    const shuffled = discQuestions.map(options => 
      [...options].sort(() => Math.random() - 0.5)
    );
    setShuffledOptions(shuffled);
  });

  const handleStep1Next = () => {
    if (!nome || !sobrenome || !dataNascimento || !email || !celular || !password || !confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (formacoes[0].nivel === '' || idiomas[0].idioma === '' || selectedSoftSkills.length === 0) {
      toast.error('Preencha pelo menos uma formação, um idioma e selecione suas soft skills');
      return;
    }
    
    const shuffled = discQuestions.map(options => 
      [...options].sort(() => Math.random() - 0.5)
    );
    setShuffledOptions(shuffled);
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
      email,
      nome,
      sobrenome,
      dataNascimento,
      celular,
      formacoes,
      formacoesComplementares,
      idiomas,
      softSkills: selectedSoftSkills,
      discProfile: discScores
    };

    const success = await register(userData, password);
    
    if (success) {
      toast.success('Cadastro realizado com sucesso!');
      navigate('/perfil');
    } else {
      toast.error('Email já cadastrado');
    }
  };

  const toggleSoftSkill = (skill: string) => {
    setSelectedSoftSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <Card className="w-full max-w-2xl p-8 shadow-card animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
              Cadastro
            </h1>
            <Badge variant="outline" className="border-primary text-primary">
              Etapa {step} de 3
            </Badge>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 flex-1 rounded-full transition-all ${s <= step ? 'bg-gradient-ai' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input id="dataNascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input id="celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} required />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>

            <Button onClick={handleStep1Next} className="w-full gap-2 bg-gradient-ai shadow-glow hover:opacity-90">
              Próximo <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Informações Profissionais</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Formações Acadêmicas</Label>
                <Button size="sm" variant="outline" onClick={() => setFormacoes([...formacoes, { nivel: '', anoInicio: '', anoFim: '', instituicao: '' }])}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              
              {formacoes.map((formacao, idx) => (
                <Card key={idx} className="p-4 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Formação {idx + 1}</span>
                    {idx > 0 && (
                      <Button size="sm" variant="ghost" onClick={() => setFormacoes(formacoes.filter((_, i) => i !== idx))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Select value={formacao.nivel} onValueChange={(value) => {
                    const newFormacoes = [...formacoes];
                    newFormacoes[idx].nivel = value;
                    setFormacoes(newFormacoes);
                  }}>
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
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Ano início" value={formacao.anoInicio} onChange={(e) => {
                      const newFormacoes = [...formacoes];
                      newFormacoes[idx].anoInicio = e.target.value;
                      setFormacoes(newFormacoes);
                    }} />
                    <Input placeholder="Ano fim" value={formacao.anoFim} onChange={(e) => {
                      const newFormacoes = [...formacoes];
                      newFormacoes[idx].anoFim = e.target.value;
                      setFormacoes(newFormacoes);
                    }} />
                  </div>
                  <Input placeholder="Instituição" value={formacao.instituicao} onChange={(e) => {
                    const newFormacoes = [...formacoes];
                    newFormacoes[idx].instituicao = e.target.value;
                    setFormacoes(newFormacoes);
                  }} />
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Formações Complementares</Label>
                <Button size="sm" variant="outline" onClick={() => setFormacoesComplementares([...formacoesComplementares, { nome: '', ano: '', instituicao: '' }])}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              
              {formacoesComplementares.map((curso, idx) => (
                <Card key={idx} className="p-4 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Curso {idx + 1}</span>
                    {idx > 0 && (
                      <Button size="sm" variant="ghost" onClick={() => setFormacoesComplementares(formacoesComplementares.filter((_, i) => i !== idx))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input placeholder="Nome do curso" value={curso.nome} onChange={(e) => {
                    const newCursos = [...formacoesComplementares];
                    newCursos[idx].nome = e.target.value;
                    setFormacoesComplementares(newCursos);
                  }} />
                  <Input placeholder="Ano" value={curso.ano} onChange={(e) => {
                    const newCursos = [...formacoesComplementares];
                    newCursos[idx].ano = e.target.value;
                    setFormacoesComplementares(newCursos);
                  }} />
                  <Input placeholder="Instituição" value={curso.instituicao} onChange={(e) => {
                    const newCursos = [...formacoesComplementares];
                    newCursos[idx].instituicao = e.target.value;
                    setFormacoesComplementares(newCursos);
                  }} />
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base flex items-center gap-2">
                  <Languages className="h-4 w-4 text-primary" />
                  Idiomas
                </Label>
                <Button size="sm" variant="outline" onClick={() => setIdiomas([...idiomas, { idioma: '', nivel: '' }])}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              
              {idiomas.map((idioma, idx) => (
                <Card key={idx} className="p-4 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Idioma {idx + 1}</span>
                    {idx > 0 && (
                      <Button size="sm" variant="ghost" onClick={() => setIdiomas(idiomas.filter((_, i) => i !== idx))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Idioma" value={idioma.idioma} onChange={(e) => {
                      const newIdiomas = [...idiomas];
                      newIdiomas[idx].idioma = e.target.value;
                      setIdiomas(newIdiomas);
                    }} />
                    <Select value={idioma.nivel} onValueChange={(value) => {
                      const newIdiomas = [...idiomas];
                      newIdiomas[idx].nivel = value;
                      setIdiomas(newIdiomas);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="fluente">Fluente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Label className="text-base">Soft Skills</Label>
              <div className="flex flex-wrap gap-2">
                {softSkillsOptions.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSoftSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleSoftSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 gap-2">
                <ChevronLeft className="h-4 w-4" /> Voltar
              </Button>
              <Button onClick={handleStep2Next} className="flex-1 gap-2 bg-gradient-ai shadow-glow hover:opacity-90">
                Próximo <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Teste DISC</h2>
              <p className="text-muted-foreground">Pergunta {currentQuestion + 1} de {discQuestions.length}</p>
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div 
                  className="bg-gradient-ai h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / discQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-lg font-semibold text-center mb-6">
                Selecione o adjetivo que melhor descreve você!
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {shuffledOptions[currentQuestion]?.map((option, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-auto py-4 text-lg hover:bg-gradient-ai hover:text-primary-foreground hover:border-primary transition-all hover:scale-105"
                    onClick={() => handleDISCAnswer(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
