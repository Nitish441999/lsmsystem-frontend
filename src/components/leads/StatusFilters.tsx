import { Filter, FileSpreadsheet, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadStatus, Lead } from "@/types/lead";
import { exportToExcel, exportToPDF } from "@/lib/exportUtils";

interface StatusFiltersProps {
  selectedStatus: LeadStatus | "all";
  onStatusChange: (status: LeadStatus | "all") => void;
  leads: Lead[];
  title: string;
  filename: string;
}

export function StatusFilters({
  selectedStatus,
  onStatusChange,
  leads,
  title,
  filename,
}: StatusFiltersProps) {
  const getFilename = () => {
    const date = new Date().toISOString().split("T")[0];
    return `${filename}-${date}`;
  };

  const handleExportExcel = () => {
    exportToExcel(leads, getFilename());
  };

  const handleExportPDF = () => {
    exportToPDF(leads, getFilename(), title);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Filters:
        </span>
      </div>

      <Select
        value={selectedStatus}
        onValueChange={(value) => onStatusChange(value as LeadStatus | "all")}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="converted">Converted</SelectItem>
          <SelectItem value="lost">Lost</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="sm" onClick={handleExportExcel}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Excel
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportPDF}>
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </Button>
      </div>
    </div>
  );
}
