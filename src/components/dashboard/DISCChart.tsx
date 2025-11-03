import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const discData = [
  { name: "Dominância", value: 28, color: "hsl(170, 90%, 45%)" },
  { name: "Influência", value: 35, color: "hsl(220, 80%, 55%)" },
  { name: "Estabilidade", value: 22, color: "hsl(140, 85%, 50%)" },
  { name: "Conformidade", value: 15, color: "hsl(280, 70%, 55%)" },
];

export function DISCChart() {
  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Distribuição de Perfis DISC</CardTitle>
        <p className="text-sm text-muted-foreground">Análise comportamental dos candidatos ativos</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={discData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {discData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
