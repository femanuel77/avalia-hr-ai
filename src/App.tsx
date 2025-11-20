import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNav } from "@/components/layout/TopNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { CandidaturasProvider } from "@/contexts/CandidaturasContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Vagas from "./pages/Vagas";
import NovaVaga from "./pages/NovaVaga";
import Candidatos from "./pages/Candidatos";
import VagaDetalhesEmpregador from "./pages/VagaDetalhesEmpregador";
import MinhasCandidaturas from "./pages/MinhasCandidaturas";
import VagasDisponiveis from "./pages/VagasDisponiveis";
import Login from "./pages/Login";
import LoginEmpregador from "./pages/LoginEmpregador";
import Cadastro from "./pages/Cadastro";
import CadastroEmpregador from "./pages/CadastroEmpregador";
import Perfil from "./pages/Perfil";
import PerfilEdit from "./pages/PerfilEdit";
import VagaDetalhes from "./pages/VagaDetalhes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CandidaturasProvider>
            <div className="min-h-screen bg-background">
            <TopNav />
            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-empregador" element={<LoginEmpregador />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/cadastro-empregador" element={<CadastroEmpregador />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vagas" element={<Vagas />} />
                <Route path="/vagas/nova" element={<NovaVaga />} />
                <Route path="/vagas/:id" element={<VagaDetalhesEmpregador />} />
                <Route path="/vagas/:vagaId/candidatos/:candidatoId" element={<Candidatos />} />
                <Route path="/minhas-vagas" element={<Vagas />} />
                <Route path="/minhas-candidaturas" element={<MinhasCandidaturas />} />
                <Route path="/vagas-disponiveis" element={<VagasDisponiveis />} />
                <Route path="/vagas-disponiveis/:id" element={<VagaDetalhes />} />
                <Route path="/candidatos" element={<Candidatos />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/perfil/editar" element={<PerfilEdit />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          </CandidaturasProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
