import { Vaga } from '@/types/vagas';

export const vagasData: Vaga[] = [
  {
    id: '1',
    nomeVaga: "Desenvolvedor Full Stack",
    empresaId: "empresa1",
    empresaNome: "Tech Solutions LTDA",
    dataCriacao: "2025-01-15",
    prazoInscricao: "2025-02-15",
    descricao: `Buscamos um desenvolvedor full stack experiente para integrar nossa equipe de desenvolvimento.

**Responsabilidades:**
- Desenvolver e manter aplicações web usando React e Node.js
- Criar APIs RESTful escaláveis
- Colaborar com designers e outros desenvolvedores
- Participar de code reviews e contribuir para melhorias no código

**Requisitos:**
- Experiência com React, TypeScript e Node.js
- Conhecimento em bancos de dados SQL e NoSQL
- Familiaridade com Git e metodologias ágeis
- Boa comunicação e trabalho em equipe

**Diferenciais:**
- Experiência com Docker e Kubernetes
- Conhecimento em práticas de DevOps
- Contribuições em projetos open source`,
    requisitos: ["React", "TypeScript", "Node.js", "SQL", "NoSQL", "Git"],
    perfisDesejados: ["D", "I"],
    status: "aberta",
    contato: {
      email: "rh@techsolutions.com.br",
      telefone: "(11) 98765-4321",
      whatsapp: "(11) 98765-4321",
      website: "https://techsolutions.com.br",
      linkedin: "https://linkedin.com/company/techsolutions",
      instagram: "https://instagram.com/techsolutions",
    }
  },
  {
    id: '2',
    nomeVaga: "Designer UX/UI Senior",
    empresaId: "empresa2",
    empresaNome: "Creative Studio",
    dataCriacao: "2025-01-12",
    prazoInscricao: "2025-02-12",
    descricao: `Procuramos um Designer UX/UI Senior para liderar projetos de design de produtos digitais.

**Responsabilidades:**
- Criar interfaces intuitivas e visualmente atraentes
- Conduzir pesquisas com usuários e testes de usabilidade
- Desenvolver wireframes, protótipos e design systems
- Colaborar com equipes de produto e desenvolvimento

**Requisitos:**
- Portfólio robusto com casos de estudo
- Domínio de Figma, Sketch ou Adobe XD
- Experiência em design thinking e metodologias centradas no usuário
- Conhecimento em princípios de acessibilidade (WCAG)

**Diferenciais:**
- Experiência com motion design
- Conhecimento básico de HTML/CSS
- Experiência em design de produtos mobile`,
    requisitos: ["Figma", "UX Design", "UI Design", "Prototipagem", "Design Thinking"],
    perfisDesejados: ["I", "S"],
    status: "aberta",
    contato: {
      email: "contato@creativestudio.com.br",
      telefone: "(11) 91234-5678",
      whatsapp: "(11) 91234-5678",
      website: "https://creativestudio.com.br",
      linkedin: "https://linkedin.com/company/creativestudio",
    }
  },
  {
    id: '3',
    nomeVaga: "Analista de Dados",
    empresaId: "empresa3",
    empresaNome: "DataCorp Analytics",
    dataCriacao: "2025-01-08",
    prazoInscricao: "2025-02-08",
    descricao: `Estamos em busca de um Analista de Dados para transformar dados em insights acionáveis.

**Responsabilidades:**
- Coletar, processar e analisar grandes volumes de dados
- Criar dashboards e relatórios para stakeholders
- Desenvolver modelos preditivos e análises estatísticas
- Identificar tendências e oportunidades de negócio

**Requisitos:**
- Experiência com Python, R ou SQL
- Conhecimento em ferramentas de visualização (Tableau, Power BI)
- Formação em Estatística, Matemática, Ciência da Computação ou áreas relacionadas
- Capacidade analítica e atenção aos detalhes

**Diferenciais:**
- Experiência com machine learning
- Conhecimento em Big Data (Hadoop, Spark)
- Certificações em análise de dados`,
    requisitos: ["Python", "SQL", "Tableau", "Power BI", "Estatística"],
    perfisDesejados: ["C", "D"],
    status: "aberta",
    contato: {
      email: "recrutamento@datacorp.com.br",
      telefone: "(21) 98888-7777",
      whatsapp: "(21) 98888-7777",
      website: "https://datacorp.com.br",
      linkedin: "https://linkedin.com/company/datacorp",
      instagram: "https://instagram.com/datacorp",
    }
  },
  {
    id: '4',
    nomeVaga: "Gerente de Projetos",
    empresaId: "empresa4",
    empresaNome: "PMO Excellence",
    dataCriacao: "2025-01-05",
    prazoInscricao: "2025-02-05",
    descricao: `Buscamos um Gerente de Projetos experiente para liderar projetos estratégicos.

**Responsabilidades:**
- Planejar, executar e monitorar projetos complexos
- Gerenciar equipes multidisciplinares
- Garantir o cumprimento de prazos, escopo e orçamento
- Comunicar-se com stakeholders e reportar progresso

**Requisitos:**
- Certificação PMP ou equivalente
- Experiência mínima de 5 anos em gestão de projetos
- Conhecimento em metodologias ágeis e tradicionais
- Excelentes habilidades de liderança e comunicação

**Diferenciais:**
- Certificação Scrum Master ou Product Owner
- Experiência em transformação digital
- Inglês fluente`,
    requisitos: ["PMP", "Gestão de Projetos", "Scrum", "Liderança"],
    perfisDesejados: ["D", "I", "S"],
    status: "aberta",
    contato: {
      email: "hr@pmoexcellence.com.br",
      telefone: "(11) 97777-6666",
      whatsapp: "(11) 97777-6666",
      website: "https://pmoexcellence.com.br",
      linkedin: "https://linkedin.com/company/pmoexcellence",
    }
  },
  {
    id: '5',
    nomeVaga: "Especialista em Marketing Digital",
    empresaId: "empresa5",
    empresaNome: "Digital Marketing Pro",
    dataCriacao: "2024-12-29",
    prazoInscricao: "2025-01-29",
    descricao: `Procuramos um Especialista em Marketing Digital para impulsionar nossa presença online.

**Responsabilidades:**
- Desenvolver e executar estratégias de marketing digital
- Gerenciar campanhas em Google Ads, Facebook Ads e outras plataformas
- Analisar métricas e otimizar performance
- Criar conteúdo para redes sociais e blog

**Requisitos:**
- Experiência comprovada em marketing digital
- Conhecimento em SEO, SEM e marketing de conteúdo
- Familiaridade com ferramentas de analytics (Google Analytics, etc)
- Criatividade e capacidade de storytelling

**Diferenciais:**
- Certificações em Google Ads e Facebook Blueprint
- Experiência com automação de marketing
- Conhecimento em growth hacking`,
    requisitos: ["Marketing Digital", "SEO", "SEM", "Google Ads", "Facebook Ads"],
    perfisDesejados: ["I", "D"],
    status: "encerrada",
    contato: {
      email: "marketing@digitalmarketingpro.com.br",
      telefone: "(11) 96666-5555",
      whatsapp: "(11) 96666-5555",
      website: "https://digitalmarketingpro.com.br",
      linkedin: "https://linkedin.com/company/digitalmarketingpro",
      instagram: "https://instagram.com/digitalmarketingpro",
    }
  },
];

// Helper data for displaying in table
export const vagasTableData = vagasData.map(v => ({
  id: v.id,
  titulo: v.nomeVaga,
  dataCriacao: new Date(v.dataCriacao).toLocaleDateString('pt-BR'),
  status: v.status === 'aberta' ? 'Ativa' : 'Encerrada',
  scoreMedio: Math.random() * 2 + 7, // Mock score
  candidatos: Math.floor(Math.random() * 50) + 10, // Mock count
}));
