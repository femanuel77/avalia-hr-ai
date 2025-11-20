import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LayoutDashboard, Briefcase, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/avalia-logo.png" alt="Aval.IA" className="h-10 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && currentUser?.tipo === 'empregador' && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/minhas-vagas"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/minhas-vagas") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Minhas Vagas
                </Link>
              </>
            )}
            {isAuthenticated && currentUser?.tipo === 'candidato' && (
              <>
                <Link
                  to="/vagas-disponiveis"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/vagas-disponiveis") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Vagas Disponíveis
                </Link>
                <Link
                  to="/minhas-candidaturas"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/minhas-candidaturas") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Minhas Candidaturas
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/perfil">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Users className="h-4 w-4" />
                    Meu Perfil
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Candidato
                  </Button>
                </Link>
                <Link to="/login-empregador">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Empregador
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
