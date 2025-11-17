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
import { Plus, TrendingUp, Briefcase, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { vagasTableData } from "@/data/vagasData";


export default function Vagas() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Vagas</h1>
          </div>
          <p className="text-muted-foreground">Gerencie as vagas abertas e acompanhe candidatos</p>
        </div>
        <Button className="gap-2 bg-gradient-ai hover:opacity-90 shadow-glow animate-pulse-glow">
          <Plus className="h-5 w-5" />
          Nova Vaga
        </Button>
      </div>

      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título da Vaga</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Data de Criação
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Candidatos
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Score Médio IA
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vagasTableData.map((vaga, index) => (
              <TableRow 
                key={vaga.id} 
                className="hover:bg-muted/50 cursor-pointer transition-all group animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                onClick={() => navigate(`/vagas/${vaga.id}`)}
              >
                <TableCell className="font-medium group-hover:text-primary transition-colors">
                  {vaga.titulo}
                </TableCell>
                <TableCell className="text-muted-foreground">{vaga.dataCriacao}</TableCell>
                <TableCell>
                  <Badge
                    variant={vaga.status === "Ativa" ? "default" : "secondary"}
                    className={
                      vaga.status === "Ativa"
                        ? "bg-gradient-ai border-0 shadow-glow"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {vaga.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{vaga.candidatos}</Badge>
                </TableCell>
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
