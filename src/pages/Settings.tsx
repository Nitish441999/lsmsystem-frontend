export default function Settings() {
  return (
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
  );
}
