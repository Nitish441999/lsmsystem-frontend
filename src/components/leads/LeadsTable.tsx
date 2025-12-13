import { format } from 'date-fns';
import { MoreHorizontal, Mail, Phone, Building2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SourceBadge, StatusBadge } from './LeadBadges';
import { useAppSelector } from '@/hooks/useAppDispatch';

export function LeadsTable() {
  const filteredLeads = useAppSelector((state) => state.leads.filteredLeads);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Lead</TableHead>
            <TableHead className="font-semibold">Contact</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Service</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead, index) => (
            <TableRow 
              key={lead.id} 
              className="hover:bg-secondary/50 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{lead.name}</span>
                  {lead.company && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {lead.company}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" />
                    {lead.email}
                  </span>
                  <span className="text-sm flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    {lead.phone}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <SourceBadge source={lead.source} />
                  {lead.campaign && (
                    <span className="text-xs text-muted-foreground truncate max-w-[140px]">{lead.campaign}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-foreground">{lead.service || '-'}</span>
              </TableCell>
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(lead.createdAt), 'MMM d, h:mm a')}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                    <DropdownMenuItem>Assign To</DropdownMenuItem>
                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredLeads.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No leads found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
