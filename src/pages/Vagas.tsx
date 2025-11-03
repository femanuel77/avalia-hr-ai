import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp } from "lucide-react";

const vagas = [
  {
    id: 1,
    titulo: "Desenvolvedor Full Stack",
    dataCriacao: "15/01/2025",
    status: "Ativa",
    scoreMedio: 8.2,
    candidatos: 34,
  },
  {
    id: 2,
    titulo: "Designer UX/UI Senior",
    dataCriacao: "12/01/2025",
    status: "Ativa",
    scoreMedio: 7.8,
    candidatos: 28,
  },
  {
    id: 3,
    titulo: "Analista de Dados",
    dataCriacao: "08/01/2025",
    status: "Ativa",
    scoreMedio: 8.5,
    candidatos: 42,
  },
  {
    id: 4,
    titulo: "Gerente de Projetos",
    dataCriacao: "05/01/2025",
    status: "Ativa",
    scoreMedio: 7.3,
    candidatos: 19,
  },
  {
    id: 5,
    titulo: "Especialista em Marketing Digital",
    dataCriacao: "29/12/2024",
    status: "Encerrada",
    scoreMedio: 8.0,
    candidatos: 51,
  },
];

export default function Vagas() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vagas Abertas</h1>
          <p className="text-muted-foreground">Gerencie todas as oportunidades de emprego</p>
        </div>
        <Button className="bg-gradient-ai hover:opacity-90 shadow-glow">
          <Plus className="h-5 w-5 mr-2" />
          Nova Vaga
        </Button>
      </div>

      <Card className="shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título da Vaga</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Candidatos</TableHead>
              <TableHead className="text-right">Score Médio IA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vagas.map((vaga) => (
              <TableRow key={vaga.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{vaga.titulo}</TableCell>
                <TableCell className="text-muted-foreground">{vaga.dataCriacao}</TableCell>
                <TableCell>
                  <Badge
                    variant={vaga.status === "Ativa" ? "default" : "secondary"}
                    className={
                      vaga.status === "Ativa"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {vaga.status}
                  </Badge>
                </TableCell>
                <TableCell>{vaga.candidatos}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-bold text-primary">{vaga.scoreMedio.toFixed(1)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
