import { Filter, FileSpreadsheet, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setSourceFilter, setStatusFilter } from '@/store/leadSlice';
import { LeadSource, LeadStatus } from '@/types/lead';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';
import { useLocation } from 'react-router-dom';

export function LeadFilters() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { selectedSource, selectedStatus, filteredLeads } = useAppSelector((state) => state.leads);

  const getExportTitle = () => {
    switch (location.pathname) {
      case '/leads/website':
        return 'Website Leads';
      case '/leads/meta':
        return 'Meta Ads Leads';
      case '/leads/google':
        return 'Google Ads Leads';
      default:
        return 'All Leads';
    }
  };

  const getFilename = () => {
    const date = new Date().toISOString().split('T')[0];
    switch (location.pathname) {
      case '/leads/website':
        return `website-leads-${date}`;
      case '/leads/meta':
        return `meta-leads-${date}`;
      case '/leads/google':
        return `google-leads-${date}`;
      default:
        return `all-leads-${date}`;
    }
  };

  const handleExportExcel = () => {
    exportToExcel(filteredLeads, getFilename());
  };

  const handleExportPDF = () => {
    exportToPDF(filteredLeads, getFilename(), getExportTitle());
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Filters:</span>
      </div>

      <Select
        value={selectedSource}
        onValueChange={(value) => dispatch(setSourceFilter(value as LeadSource | 'all'))}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="website">Website</SelectItem>
          <SelectItem value="meta">Meta Ads</SelectItem>
          <SelectItem value="google">Google Ads</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={selectedStatus}
        onValueChange={(value) => dispatch(setStatusFilter(value as LeadStatus | 'all'))}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
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
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>
    </div>
  );
}
