export interface Vaga {
  id: string;
  nomeVaga: string;
  empresaId: string;
  empresaNome: string;
  dataCriacao: string;
  prazoInscricao: string;
  descricao: string;
  requisitos: string[];
  perfisDesejados: string[]; // D, I, S, C
  status: 'aberta' | 'encerrada';
  contato: {
    email: string;
    telefone: string;
    whatsapp: string;
    website?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Candidatura {
  id: string;
  vagaId: string;
  candidatoId: string;
  candidatoNome: string;
  candidatoEmail: string;
  dataInscricao: string;
  status: 'inscricao' | 'analise' | 'entrevista-online' | 'entrevista-presencial' | 'finalizacao' | 'eliminado';
  discProfile: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
}
