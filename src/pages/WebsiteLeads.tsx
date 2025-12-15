import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { LeadsTableLocal } from '@/components/leads/LeadsTableLocal';
import { StatusFilters } from '@/components/leads/StatusFilters';

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    source: 'website',
    service: 'Digital Marketing',
    status: 'new',
    createdAt: new Date('2024-12-13T10:30:00'),
    notes: 'Interested in full-service digital marketing package',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.t@retailplus.com',
    phone: '+1 (555) 567-8901',
    company: 'RetailPlus',
    source: 'website',
    service: 'E-commerce Solutions',
    status: 'new',
    createdAt: new Date('2024-12-12T11:00:00'),
  },
  {
    id: '8',
    name: 'Robert Brown',
    email: 'rbrown@manufacturing.co',
    phone: '+1 (555) 890-1234',
    company: 'Manufacturing Co',
    source: 'website',
    service: 'Brand Strategy',
    status: 'new',
    createdAt: new Date('2024-12-10T14:45:00'),
  },
];

export default function WebsiteLeads() {
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
        <h2 className="text-2xl font-bold text-foreground">Website Leads</h2>
        <p className="text-muted-foreground">Leads captured from your website forms.</p>
      </div>

      <StatusFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="Website Leads"
        filename="website-leads"
      />
      <LeadsTableLocal leads={filteredLeads} onUpdateLead={handleUpdateLead} />
    </div>
  );
}
