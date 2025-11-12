import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Building2, Mail, Lock, Phone, MapPin, FileText } from 'lucide-react';

export default function CadastroEmpregador() {
  const [formData, setFormData] = useState({
    email: '',
    cnpj: '',
    nomeEmpresa: '',
    endereco: '',
    telefone: '',
    password: '',
    confirmPassword: '',
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    const userData = {
      tipo: 'empregador' as const,
      email: formData.email,
      cnpj: formData.cnpj,
      nomeEmpresa: formData.nomeEmpresa,
      endereco: formData.endereco,
      telefone: formData.telefone,
    };

    const success = await register(userData, formData.password);
    
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
              <Building2 className="h-8 w-8 text-primary-foreground animate-pulse-glow" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cadastro de Empresa</h1>
          <p className="text-muted-foreground">Preencha os dados da sua empresa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cnpj" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                CNPJ
              </Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeEmpresa" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Nome da Empresa
              </Label>
              <Input
                id="nomeEmpresa"
                value={formData.nomeEmpresa}
                onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Endereço
            </Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              placeholder="Rua, número, bairro, cidade - UF"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Telefone
              </Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(00) 0000-0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contato@empresa.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-ai shadow-glow hover:opacity-90 transition-all hover:scale-105"
          >
            <Building2 className="h-4 w-4" />
            Cadastrar Empresa
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login-empregador" className="text-primary font-medium hover:underline">
              Faça login aqui
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
