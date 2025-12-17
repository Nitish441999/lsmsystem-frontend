import { cn } from "@/lib/utils";
import { LeadSource, LeadStatus } from "@/types/lead";
import { Globe, Facebook, Chrome, HelpCircle } from "lucide-react";

interface SourceBadgeProps {
  source?: LeadSource;
  showLabel?: boolean;
}

const sourceConfig: Record<
  string,
  {
    label: string;
    icon: any;
    className: string;
  }
> = {
  website: {
    label: "Website",
    icon: Globe,
    className: "source-website",
  },
  meta: {
    label: "Meta Ads",
    icon: Facebook,
    className: "source-meta",
  },
  google: {
    label: "Google Ads",
    icon: Chrome,
    className: "source-google",
  },
};

export function SourceBadge({ source, showLabel = true }: SourceBadgeProps) {
  const config = source ? sourceConfig[source] : undefined;

  if (!config) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        <HelpCircle className="w-3 h-3" />
        {showLabel && "Unknown"}
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className
      )}
    >
      <Icon className="w-3 h-3" />
      {showLabel && config.label}
    </span>
  );
}

interface StatusBadgeProps {
  status?: LeadStatus;
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-status-new/10 text-status-new border border-status-new/20",
  },
  contacted: {
    label: "Contacted",
    className:
      "bg-status-contacted/10 text-status-contacted border border-status-contacted/20",
  },
  qualified: {
    label: "Qualified",
    className:
      "bg-status-qualified/10 text-status-qualified border border-status-qualified/20",
  },
  converted: {
    label: "Converted",
    className:
      "bg-status-converted/10 text-status-converted border border-status-converted/20",
  },
  lost: {
    label: "Lost",
    className:
      "bg-destructive/10 text-destructive border border-destructive/20",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status || !statusConfig[status]) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        Unknown
      </span>
    );
  }

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
