import { useState } from 'react';
import { Lead, LeadSource, LeadStatus } from '@/types/lead';
import { LeadsTableLocal } from '@/components/leads/LeadsTableLocal';
import { AllLeadsFilters } from '@/components/leads/AllLeadsFilters';

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

export default function AllLeads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedSource, setSelectedSource] = useState<LeadSource | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSource && matchesStatus;
  });

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">All Leads</h2>
        <p className="text-muted-foreground">Manage and track all your incoming leads.</p>
      </div>

      <AllLeadsFilters
        selectedSource={selectedSource}
        selectedStatus={selectedStatus}
        onSourceChange={setSelectedSource}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="All Leads"
        filename="all-leads"
      />
      <LeadsTableLocal leads={filteredLeads} onUpdateLead={handleUpdateLead} />
    </div>
  );
}
