import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Lead } from '@/types/lead';

const mockLeads: Lead[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', phone: '+1 (555) 123-4567', company: 'TechCorp Inc.', source: 'website', service: 'Digital Marketing', status: 'new', createdAt: new Date('2024-12-13T10:30:00') },
  { id: '2', name: 'Michael Chen', email: 'mchen@globalventures.io', phone: '+1 (555) 234-5678', company: 'Global Ventures', source: 'meta', campaign: 'Holiday Sale 2024', service: 'Social Media Management', status: 'contacted', createdAt: new Date('2024-12-13T09:15:00') },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@startuplab.co', phone: '+1 (555) 345-6789', company: 'StartupLab', source: 'google', campaign: 'Search - Marketing Services', service: 'SEO Services', status: 'qualified', createdAt: new Date('2024-12-12T16:45:00') },
  { id: '4', name: 'David Kim', email: 'dkim@innovate.tech', phone: '+1 (555) 456-7890', company: 'Innovate Tech', source: 'meta', campaign: 'Brand Awareness Q4', service: 'PPC Advertising', status: 'converted', createdAt: new Date('2024-12-12T14:20:00') },
  { id: '5', name: 'Lisa Thompson', email: 'lisa.t@retailplus.com', phone: '+1 (555) 567-8901', company: 'RetailPlus', source: 'website', service: 'E-commerce Solutions', status: 'new', createdAt: new Date('2024-12-12T11:00:00') },
  { id: '6', name: 'James Wilson', email: 'jwilson@financegroup.com', phone: '+1 (555) 678-9012', company: 'Finance Group LLC', source: 'google', campaign: 'Display - Financial Services', service: 'Content Marketing', status: 'contacted', createdAt: new Date('2024-12-11T15:30:00') },
  { id: '7', name: 'Amanda Garcia', email: 'agarcia@healthtech.io', phone: '+1 (555) 789-0123', company: 'HealthTech Solutions', source: 'meta', campaign: 'Healthcare B2B', service: 'Lead Generation', status: 'qualified', createdAt: new Date('2024-12-11T10:15:00') },
  { id: '8', name: 'Robert Brown', email: 'rbrown@manufacturing.co', phone: '+1 (555) 890-1234', company: 'Manufacturing Co', source: 'website', service: 'Brand Strategy', status: 'new', createdAt: new Date('2024-12-10T14:45:00') },
  { id: '9', name: 'Jennifer Lee', email: 'jlee@eduplatform.com', phone: '+1 (555) 901-2345', company: 'EduPlatform', source: 'google', campaign: 'Search - Education Sector', service: 'Video Marketing', status: 'converted', createdAt: new Date('2024-12-10T09:30:00') },
  { id: '10', name: 'Christopher Martinez', email: 'cmartinez@logisticspro.com', phone: '+1 (555) 012-3456', company: 'LogisticsPro', source: 'meta', campaign: 'Retargeting - Past Visitors', service: 'Website Development', status: 'contacted', createdAt: new Date('2024-12-09T16:00:00') },
];

export function SourceDistribution() {
  const leads = mockLeads;

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
