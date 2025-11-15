import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Building2, Sparkles } from 'lucide-react';
import { formatCNPJ, formatPhone } from '@/lib/masks';

export default function CadastroEmpregador() {
  const [formData, setFormData] = useState({
    cnpj: '',
    nomeEmpresa: '',
    endereco: '',
    email: '',
    telefone: '',
    website: '',
    linkedin: '',
    instagram: '',
    whatsapp: '',
    senha: '',
    confirmSenha: ''
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cnpj || !formData.nomeEmpresa || !formData.endereco || 
        !formData.email || !formData.telefone || !formData.senha || !formData.confirmSenha) {
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

    const userData = {
      tipo: 'empregador' as const,
      email: formData.email,
      cnpj: formData.cnpj,
      nomeEmpresa: formData.nomeEmpresa,
      endereco: formData.endereco,
      telefone: formData.telefone,
      ...(formData.website && { website: formData.website }),
      ...(formData.linkedin && { linkedin: formData.linkedin }),
      ...(formData.instagram && { instagram: formData.instagram }),
      ...(formData.whatsapp && { whatsapp: formData.whatsapp })
    };

    const success = await register(userData, formData.senha);
    
    if (success) {
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('Email já cadastrado');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <Card className="w-full max-w-2xl p-8 shadow-card animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-ai flex items-center justify-center shadow-glow">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cadastro de Empregador</h1>
          <p className="text-muted-foreground">Cadastre sua empresa no sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ *</Label>
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) => setFormData({...formData, cnpj: formatCNPJ(e.target.value)})}
              placeholder="00.000.000/0000-00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
            <Input
              id="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={(e) => setFormData({...formData, nomeEmpresa: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              required
            />
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
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: formatPhone(e.target.value)})}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Business</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: formatPhone(e.target.value)})}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                placeholder="@empresa"
              />
            </div>
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

          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-ai shadow-glow hover:opacity-90 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Cadastrar Empresa
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login-empregador" className="text-primary font-medium hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
