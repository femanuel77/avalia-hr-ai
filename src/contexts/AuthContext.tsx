import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CandidatoProfile {
  tipo: 'candidato';
  email: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  celular: string;
  formacoes: Array<{
    nivel: string;
    anoInicio: string;
    anoFim: string;
    instituicao: string;
  }>;
  formacoesComplementares: Array<{
    nome: string;
    ano: string;
    instituicao: string;
  }>;
  idiomas: Array<{
    idioma: string;
    nivel: string;
  }>;
  softSkills: string[];
  discProfile: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
}

interface EmpregadorProfile {
  tipo: 'empregador';
  email: string;
  cnpj: string;
  nomeEmpresa: string;
  endereco: string;
  telefone: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
}

type UserProfile = CandidatoProfile | EmpregadorProfile;

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: UserProfile, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[email];
    
    if (user && user.password === password) {
      setCurrentUser(user.profile);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user.profile));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: UserProfile, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[userData.email]) {
      return false;
    }
    
    users[userData.email] = {
      password,
      profile: userData
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
