import { format } from 'date-fns';
import { Mail, Phone, Building2, Calendar, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SourceBadge } from './LeadBadges';
import { Lead, LeadStatus } from '@/types/lead';

interface LeadDetailsDialogLocalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateLead: (lead: Lead) => void;
}

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-500' },
  { value: 'converted', label: 'Converted', color: 'bg-purple-500' },
  { value: 'lost', label: 'Lost', color: 'bg-red-500' },
];

export function LeadDetailsDialogLocal({ lead, open, onOpenChange, onUpdateLead }: LeadDetailsDialogLocalProps) {
  if (!lead) return null;

  const handleStatusChange = (newStatus: LeadStatus) => {
    onUpdateLead({ ...lead, status: newStatus });
  };

  const getStatusColor = (status: LeadStatus) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Lead Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Lead Name & Company */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
              {lead.company && (
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {lead.company}
                </p>
              )}
            </div>
            <SourceBadge source={lead.source} />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-3 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.phone}</span>
            </div>
            {lead.campaign && (
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{lead.campaign}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">
                {format(new Date(lead.createdAt), 'MMMM d, yyyy h:mm a')}
              </span>
            </div>
          </div>

          {/* Service */}
          {lead.service && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Service Interested</p>
              <p className="text-foreground font-medium">{lead.service}</p>
            </div>
          )}

          {/* Status Selector */}
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            <Select value={lead.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full bg-card border-border">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(lead.status)}`} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <p className="text-foreground">{lead.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
