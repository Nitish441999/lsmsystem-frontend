import { useLeads } from '@/contexts/LeadsContext';
import { format } from 'date-fns';
import { SourceBadge } from './LeadBadges';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentLeads() {
  const { leads } = useLeads();
  const recentLeads = leads.slice(0, 5);

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
