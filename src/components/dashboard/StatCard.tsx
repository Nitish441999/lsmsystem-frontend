import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  iconBg?: string;
  className?: string;
}

export function StatCard({ title, value, change, icon, iconBg = 'bg-primary/10', className }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn(
      'bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="w-4 h-4 text-status-qualified" />}
              {isNegative && <TrendingDown className="w-4 h-4 text-destructive" />}
              <span className={cn(
                'text-sm font-medium',
                isPositive && 'text-status-qualified',
                isNegative && 'text-destructive',
                !isPositive && !isNegative && 'text-muted-foreground'
              )}>
                {isPositive && '+'}{change}%
              </span>
              <span className="text-sm text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
