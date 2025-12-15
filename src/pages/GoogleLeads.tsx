import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { LeadsTableLocal } from '@/components/leads/LeadsTableLocal';
import { StatusFilters } from '@/components/leads/StatusFilters';

const mockLeads: Lead[] = [
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@startuplab.co',
    phone: '+1 (555) 345-6789',
    company: 'StartupLab',
    source: 'google',
    campaign: 'Search - Marketing Services',
    service: 'SEO Services',
    status: 'qualified',
    createdAt: new Date('2024-12-12T16:45:00'),
    assignedTo: 'Jane Doe',
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'jwilson@financegroup.com',
    phone: '+1 (555) 678-9012',
    company: 'Finance Group LLC',
    source: 'google',
    campaign: 'Display - Financial Services',
    service: 'Content Marketing',
    status: 'contacted',
    createdAt: new Date('2024-12-11T15:30:00'),
    assignedTo: 'Jane Doe',
  },
  {
    id: '9',
    name: 'Jennifer Lee',
    email: 'jlee@eduplatform.com',
    phone: '+1 (555) 901-2345',
    company: 'EduPlatform',
    source: 'google',
    campaign: 'Search - Education Sector',
    service: 'Video Marketing',
    status: 'converted',
    createdAt: new Date('2024-12-10T09:30:00'),
    assignedTo: 'Jane Doe',
  },
];

export default function GoogleLeads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = leads.filter((lead) => {
    return selectedStatus === 'all' || lead.status === selectedStatus;
  });

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Google Ads Leads</h2>
        <p className="text-muted-foreground">Leads from Google Ads Lead Forms.</p>
      </div>

      <StatusFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="Google Ads Leads"
        filename="google-leads"
      />
      <LeadsTableLocal leads={filteredLeads} onUpdateLead={handleUpdateLead} />
    </div>
  );
}
