import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vaga } from '@/types/vagas';
import { useAuth } from './AuthContext';

interface SimpleCandidatura {
  vagaId: string;
  vaga: Vaga;
  dataCandidatura: string;
  status: 'inscricao' | 'analise' | 'entrevista-online' | 'entrevista-presencial' | 'finalizacao';
}

interface CandidaturasContextType {
  candidaturas: SimpleCandidatura[];
  candidatarVaga: (vaga: Vaga) => void;
  removerCandidatura: (vagaId: string) => void;
  isCandidatado: (vagaId: string) => boolean;
  getCandidatura: (vagaId: string) => SimpleCandidatura | undefined;
  atualizarStatus: (vagaId: string, status: SimpleCandidatura['status']) => void;
}

const CandidaturasContext = createContext<CandidaturasContextType | undefined>(undefined);

export function CandidaturasProvider({ children }: { children: ReactNode }) {
  const [candidaturas, setCandidaturas] = useState<SimpleCandidatura[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`candidaturas_${currentUser.email}`);
      if (saved) {
        setCandidaturas(JSON.parse(saved));
      }
    }
  }, [currentUser]);

  const saveCandidaturas = (newCandidaturas: SimpleCandidatura[]) => {
    if (currentUser) {
      setCandidaturas(newCandidaturas);
      localStorage.setItem(`candidaturas_${currentUser.email}`, JSON.stringify(newCandidaturas));
    }
  };

  const candidatarVaga = (vaga: Vaga) => {
    const novaCandidatura: SimpleCandidatura = {
      vagaId: vaga.id,
      vaga,
      dataCandidatura: new Date().toISOString(),
      status: 'inscricao',
    };
    saveCandidaturas([...candidaturas, novaCandidatura]);
  };

  const removerCandidatura = (vagaId: string) => {
    saveCandidaturas(candidaturas.filter(c => c.vagaId !== vagaId));
  };

  const isCandidatado = (vagaId: string) => {
    return candidaturas.some(c => c.vagaId === vagaId);
  };

  const getCandidatura = (vagaId: string) => {
    return candidaturas.find(c => c.vagaId === vagaId);
  };

  const atualizarStatus = (vagaId: string, status: SimpleCandidatura['status']) => {
    saveCandidaturas(
      candidaturas.map(c => 
        c.vagaId === vagaId ? { ...c, status } : c
      )
    );
  };

  return (
    <CandidaturasContext.Provider value={{ 
      candidaturas, 
      candidatarVaga, 
      removerCandidatura, 
      isCandidatado, 
      getCandidatura,
      atualizarStatus 
    }}>
      {children}
    </CandidaturasContext.Provider>
  );
}

export function useCandidaturas() {
  const context = useContext(CandidaturasContext);
  if (context === undefined) {
    throw new Error('useCandidaturas must be used within a CandidaturasProvider');
  }
  return context;
}
