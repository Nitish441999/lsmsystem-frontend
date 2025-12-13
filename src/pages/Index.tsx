import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setLeads } from '@/store/leadSlice';
import { mockLeads } from '@/data/mockLeads';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { LeadsChart } from '@/components/dashboard/LeadsChart';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { RecentLeads } from '@/components/leads/RecentLeads';
import { SourceDistribution } from '@/components/dashboard/SourceDistribution';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Initialize with mock data
    store.dispatch(setLeads(mockLeads));
  }, []);

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's your lead overview.</p>
          </div>

          <StatsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LeadsChart />
            </div>
            <div className="space-y-6">
              <SourceDistribution />
            </div>
          </div>

          <RecentLeads />
        </div>
      )}

      {(activeTab === 'leads' || activeTab === 'website' || activeTab === 'meta' || activeTab === 'google') && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {activeTab === 'leads' ? 'All Leads' : 
               activeTab === 'website' ? 'Website Leads' :
               activeTab === 'meta' ? 'Meta Ads Leads' : 'Google Ads Leads'}
            </h2>
            <p className="text-muted-foreground">Manage and track all your incoming leads.</p>
          </div>

          <LeadFilters />
          <LeadsTable />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
            <p className="text-muted-foreground">Performance insights and conversion tracking.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeadsChart />
            <SourceDistribution />
          </div>

          <StatsGrid />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-muted-foreground">Configure your integrations and preferences.</p>
          </div>

          <div className="grid gap-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">API Integrations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium">Meta Ads API</p>
                    <p className="text-sm text-muted-foreground">Connect your Facebook & Instagram Ads</p>
                  </div>
                  <span className="px-3 py-1 bg-status-qualified/10 text-status-qualified text-sm rounded-full font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium">Google Ads API</p>
                    <p className="text-sm text-muted-foreground">Sync leads from Google Ads Lead Forms</p>
                  </div>
                  <span className="px-3 py-1 bg-status-qualified/10 text-status-qualified text-sm rounded-full font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium">Website Forms</p>
                    <p className="text-sm text-muted-foreground">Auto-capture from your website</p>
                  </div>
                  <span className="px-3 py-1 bg-status-qualified/10 text-status-qualified text-sm rounded-full font-medium">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm">Email notifications for new leads</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">SMS alerts for high-priority leads</span>
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Daily summary reports</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

const Index = () => {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
};

export default Index;
