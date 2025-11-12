import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LayoutDashboard, Briefcase, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
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
              to="/vagas"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/vagas") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Vagas
            </Link>
            <Link
              to="/candidatos"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/candidatos") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Candidatos
            </Link>
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
                    Login
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button size="sm" className="gap-2 bg-gradient-ai shadow-glow hover:opacity-90">
                    <UserPlus className="h-4 w-4" />
                    Cadastrar
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
