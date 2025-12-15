import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { LeadsTableLocal } from '@/components/leads/LeadsTableLocal';
import { StatusFilters } from '@/components/leads/StatusFilters';

const mockLeads: Lead[] = [
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@globalventures.io',
    phone: '+1 (555) 234-5678',
    company: 'Global Ventures',
    source: 'meta',
    campaign: 'Holiday Sale 2024',
    service: 'Social Media Management',
    status: 'contacted',
    createdAt: new Date('2024-12-13T09:15:00'),
    assignedTo: 'John Smith',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'dkim@innovate.tech',
    phone: '+1 (555) 456-7890',
    company: 'Innovate Tech',
    source: 'meta',
    campaign: 'Brand Awareness Q4',
    service: 'PPC Advertising',
    status: 'converted',
    createdAt: new Date('2024-12-12T14:20:00'),
    assignedTo: 'John Smith',
  },
  {
    id: '7',
    name: 'Amanda Garcia',
    email: 'agarcia@healthtech.io',
    phone: '+1 (555) 789-0123',
    company: 'HealthTech Solutions',
    source: 'meta',
    campaign: 'Healthcare B2B',
    service: 'Lead Generation',
    status: 'qualified',
    createdAt: new Date('2024-12-11T10:15:00'),
    assignedTo: 'John Smith',
  },
  {
    id: '10',
    name: 'Christopher Martinez',
    email: 'cmartinez@logisticspro.com',
    phone: '+1 (555) 012-3456',
    company: 'LogisticsPro',
    source: 'meta',
    campaign: 'Retargeting - Past Visitors',
    service: 'Website Development',
    status: 'contacted',
    createdAt: new Date('2024-12-09T16:00:00'),
    assignedTo: 'John Smith',
  },
];

export default function MetaLeads() {
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
        <h2 className="text-2xl font-bold text-foreground">Meta Ads Leads</h2>
        <p className="text-muted-foreground">Leads from Facebook & Instagram Ads campaigns.</p>
      </div>

      <StatusFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="Meta Ads Leads"
        filename="meta-leads"
      />
      <LeadsTableLocal leads={filteredLeads} onUpdateLead={handleUpdateLead} />
    </div>
  );
}
