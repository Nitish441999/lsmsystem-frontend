import {
  Users,
  Globe,
  Facebook,
  Chrome,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchDashboard } from "../../fethure/dashboard/dashboardSlice";

export function StatsGrid() {
  const dispatch = useAppDispatch();

  const {
    totalLeads,
    sourceWise,
    convertedLeads,
    conversionRate,
    todayLeads,
    loading,
  } = useAppSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-10">Loading dashboard stats...</div>;
  }

  const stats = {
    total: totalLeads,
    website: sourceWise.website,
    meta: sourceWise.meta,
    google: sourceWise.google,
    newLeads: todayLeads,
    converted: convertedLeads,
    conversionRate,
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={<Users className="w-6 h-6 text-primary" />}
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Website Leads"
          value={stats.website}
          icon={<Globe className="w-6 h-6 text-source-website" />}
          iconBg="bg-source-website/10"
        />
        <StatCard
          title="Meta Ads Leads"
          value={stats.meta}
          icon={<Facebook className="w-6 h-6 text-source-meta" />}
          iconBg="bg-source-meta/10"
        />
        <StatCard
          title="Google Ads Leads"
          value={stats.google}
          icon={<Chrome className="w-6 h-6 text-source-google" />}
          iconBg="bg-source-google/10"
        />
        <StatCard
          title="New Leads Today"
          value={stats.newLeads}
          icon={<TrendingUp className="w-6 h-6 text-status-new" />}
          iconBg="bg-status-new/10"
        />
        <StatCard
          title="Converted"
          value={stats.converted}
          icon={<UserCheck className="w-6 h-6 text-status-qualified" />}
          iconBg="bg-status-qualified/10"
        />
        <StatCard
          title="Conversion Rate"
          value={stats.conversionRate}
          icon={<TrendingUp className="w-6 h-6 text-status-converted" />}
          iconBg="bg-status-converted/10"
          className="lg:col-span-2"
        />
      </div>
    </>
  );
}
