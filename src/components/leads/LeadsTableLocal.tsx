import { useEffect, useState } from "react";
import { MoreHorizontal, Mail, Phone, Building2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SourceBadge, StatusBadge } from "./LeadBadges";
import { LeadDetailsDialogLocal } from "./LeadDetailsDialogLocal";
import { Lead } from "@/types/lead";
import { formatDateSafe } from "../../utils/date";

import {
  addWebsiteLead,
  deleteWebsiteLead,
} from "@/fethure/website/websiteSlice";

import {
  addGoogleLead,
  deleteGoogleLead,
} from "@/fethure/googleAdds/googleAddSlice";

import { addMetaLead, deleteMetaLead } from "@/fethure/metaAdds/metaAddSlice";

import { useAppDispatch } from "../../store/hooks";
import { socket } from "@/utils/socket";

interface LeadsTableLocalProps {
  leads: Lead[];
}

export function LeadsTableLocal({ leads }: LeadsTableLocalProps) {
  const dispatch = useAppDispatch();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setDialogOpen(true);
  };

  
  const handleDeleteLead = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();

    if (!lead?._id) return;

    switch (lead.source) {
      case "website":
        dispatch(deleteWebsiteLead(lead._id));
        break;

      case "google":
        dispatch(deleteGoogleLead(lead._id));
        break;

      case "meta":
        dispatch(deleteMetaLead(lead._id));
        break;

      default:
        console.warn("Unknown lead source:", lead.source);
    }
  };

  useEffect(() => {
    socket.on("websiteLeadCreated", (newLead: Lead) => {
      dispatch(addWebsiteLead(newLead));
    });

    socket.on("googleLeadCreated", (newLead: Lead) => {
      dispatch(addGoogleLead(newLead));
    });

    socket.on("metaLeadCreated", (newLead: Lead) => {
      dispatch(addMetaLead(newLead));
    });

    return () => {
      socket.off("websiteLeadCreated");
      socket.off("googleLeadCreated");
      socket.off("metaLeadCreated");
    };
  }, [dispatch]);

  return (
    <>
      <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead._id}
                className="hover:bg-secondary/50 cursor-pointer"
                onClick={() => handleViewDetails(lead)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{lead.name}</span>
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
                      {lead.contact}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <SourceBadge source={lead.source} />
                </TableCell>

                <TableCell>{lead.service || "-"}</TableCell>

                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDateSafe(lead.createdAt)}
                  </span>
                </TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem>Edit Lead</DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => handleDeleteLead(e, lead)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {leads.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No leads found.
          </div>
        )}
      </div>

      <LeadDetailsDialogLocal
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
