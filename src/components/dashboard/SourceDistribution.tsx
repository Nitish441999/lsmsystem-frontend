import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLeads } from '@/contexts/LeadsContext';

export function SourceDistribution() {
  const { leads } = useLeads();

  const data = [
    { name: 'Website', value: leads.filter((l) => l.source === 'website').length, color: 'hsl(199, 89%, 48%)' },
    { name: 'Meta Ads', value: leads.filter((l) => l.source === 'meta').length, color: 'hsl(262, 83%, 58%)' },
    { name: 'Google Ads', value: leads.filter((l) => l.source === 'google').length, color: 'hsl(142, 71%, 45%)' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Source Distribution</h3>
        <p className="text-sm text-muted-foreground">Lead breakdown by platform</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend
            formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
