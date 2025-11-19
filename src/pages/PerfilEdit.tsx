import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Plus, X, Save, User, Trash2, ArrowLeft } from 'lucide-react';

const softSkillsOptions = [
  'Comunicação', 'Trabalho em equipe', 'Liderança', 'Proatividade', 
  'Resolução de problemas', 'Criatividade', 'Adaptabilidade', 'Gestão de tempo',
  'Pensamento crítico', 'Inteligência emocional', 'Ferramentas de escritório'
];

export default function PerfilEdit() {
  const navigate = useNavigate();
  const { currentUser, register } = useAuth();
  
  const [formacoes, setFormacoes] = useState<Array<any>>([]);
  const [formacoesComplementares, setFormacoesComplementares] = useState<Array<any>>([]);
  const [idiomas, setIdiomas] = useState<Array<any>>([]);
  const [experiencias, setExperiencias] = useState<Array<any>>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser || currentUser.tipo !== 'candidato') {
      navigate('/perfil');
      return;
    }

    setFormacoes(currentUser.formacoes || []);
    setFormacoesComplementares(currentUser.formacoesComplementares || []);
    setIdiomas(currentUser.idiomas || []);
    setExperiencias(currentUser.experiencias || []);
    setSoftSkills(currentUser.softSkills || []);
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.tipo !== 'candidato') {
    return null;
  }

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

  const addExperiencia = () => {
    setExperiencias([...experiencias, { cargo: '', empresa: '', periodo: '', atividades: '' }]);
  };

  const removeExperiencia = (index: number) => {
    setExperiencias(experiencias.filter((_, i) => i !== index));
  };

  const updateExperiencia = (index: number, field: string, value: string) => {
    const newExperiencias = [...experiencias];
    newExperiencias[index] = { ...newExperiencias[index], [field]: value };
    setExperiencias(newExperiencias);
  };

  const toggleSoftSkill = (skill: string) => {
    setSoftSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = async () => {
    const hasFormacao = formacoes.some(f => f.nivel && f.nomeCurso && f.anoInicio && f.anoFim && f.instituicao);
    if (!hasFormacao) {
      toast.error('Preencha pelo menos uma formação');
      return;
    }

    if (softSkills.length === 0) {
      toast.error('Adicione pelo menos uma soft skill');
      return;
    }

    const updatedUser = {
      ...currentUser,
      formacoes,
      formacoesComplementares: formacoesComplementares.length > 0 ? formacoesComplementares : undefined,
      idiomas: idiomas.length > 0 ? idiomas : undefined,
      experiencias: experiencias.length > 0 ? experiencias : undefined,
      softSkills,
    };

    // Atualizar localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[currentUser.email]) {
      users[currentUser.email].profile = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    toast.success('Perfil atualizado com sucesso!');
    navigate('/perfil');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/perfil')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Editar Perfil</h1>
          </div>
          <p className="text-muted-foreground">Atualize suas informações profissionais</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Formações Acadêmicas */}
        <Card className="p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-lg font-semibold">Formações Acadêmicas *</Label>
            <Button onClick={addFormacao} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
          
          {formacoes.map((formacao, index) => (
            <Card key={index} className="p-4 mb-4 bg-muted/50">
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
        </Card>

        {/* Experiências Profissionais */}
        <Card className="p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-lg font-semibold">Experiências Profissionais</Label>
            <Button onClick={addExperiencia} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
          
          {experiencias.map((exp, index) => (
            <Card key={index} className="p-4 mb-4 bg-muted/50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold">Experiência {index + 1}</h4>
                <Button onClick={() => removeExperiencia(index)} variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  placeholder="Cargo"
                  value={exp.cargo}
                  onChange={(e) => updateExperiencia(index, 'cargo', e.target.value)}
                />
                <Input
                  placeholder="Empresa"
                  value={exp.empresa}
                  onChange={(e) => updateExperiencia(index, 'empresa', e.target.value)}
                />
                <Input
                  placeholder="Período (ex: Jan/2020 - Dez/2022)"
                  value={exp.periodo}
                  onChange={(e) => updateExperiencia(index, 'periodo', e.target.value)}
                />
                <Textarea
                  placeholder="Principais atividades desempenhadas neste cargo"
                  value={exp.atividades}
                  onChange={(e) => updateExperiencia(index, 'atividades', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </Card>
          ))}
        </Card>

        {/* Formações Complementares */}
        <Card className="p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-lg font-semibold">Formações Complementares</Label>
            <Button onClick={addFormacaoComplementar} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
          
          {formacoesComplementares.map((formacao, index) => (
            <Card key={index} className="p-4 mb-4 bg-muted/50">
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
        </Card>

        {/* Idiomas */}
        <Card className="p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-lg font-semibold">Idiomas</Label>
            <Button onClick={addIdioma} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
          
          {idiomas.map((idioma, index) => (
            <Card key={index} className="p-4 mb-4 bg-muted/50">
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
        </Card>

        {/* Soft Skills */}
        <Card className="p-6 shadow-card">
          <Label className="text-lg font-semibold mb-3 block">Soft Skills *</Label>
          <div className="flex flex-wrap gap-2">
            {softSkillsOptions.map(skill => (
              <Badge
                key={skill}
                variant={softSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer transition-all"
                onClick={() => toggleSoftSkill(skill)}
              >
                {skill}
                {softSkills.includes(skill) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex-1 gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
          <Button onClick={() => navigate('/perfil')} variant="outline">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
