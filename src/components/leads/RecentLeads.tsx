import { format } from 'date-fns';
import { SourceBadge } from './LeadBadges';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lead } from '@/types/lead';

const mockLeads: Lead[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', phone: '+1 (555) 123-4567', company: 'TechCorp Inc.', source: 'website', service: 'Digital Marketing', status: 'new', createdAt: new Date('2024-12-13T10:30:00') },
  { id: '2', name: 'Michael Chen', email: 'mchen@globalventures.io', phone: '+1 (555) 234-5678', company: 'Global Ventures', source: 'meta', campaign: 'Holiday Sale 2024', service: 'Social Media Management', status: 'contacted', createdAt: new Date('2024-12-13T09:15:00') },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@startuplab.co', phone: '+1 (555) 345-6789', company: 'StartupLab', source: 'google', campaign: 'Search - Marketing Services', service: 'SEO Services', status: 'qualified', createdAt: new Date('2024-12-12T16:45:00') },
  { id: '4', name: 'David Kim', email: 'dkim@innovate.tech', phone: '+1 (555) 456-7890', company: 'Innovate Tech', source: 'meta', campaign: 'Brand Awareness Q4', service: 'PPC Advertising', status: 'converted', createdAt: new Date('2024-12-12T14:20:00') },
  { id: '5', name: 'Lisa Thompson', email: 'lisa.t@retailplus.com', phone: '+1 (555) 567-8901', company: 'RetailPlus', source: 'website', service: 'E-commerce Solutions', status: 'new', createdAt: new Date('2024-12-12T11:00:00') },
];

export function RecentLeads() {
  const recentLeads = mockLeads.slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
          <p className="text-sm text-muted-foreground">Latest incoming leads</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentLeads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {lead.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <SourceBadge source={lead.source} showLabel={false} />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(new Date(lead.createdAt), 'h:mm a')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
