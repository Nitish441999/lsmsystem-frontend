import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Globe,
  Facebook,
  Chrome,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "leads", label: "All Leads", icon: Users, path: "/alleads" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
];

const sourceItems = [
  {
    id: "website",
    label: "Website",
    icon: Globe,
    color: "text-source-website",
    path: "/leads/website",
  },
  {
    id: "meta",
    label: "Meta Ads",
    icon: Facebook,
    color: "text-source-meta",
    path: "/leads/meta",
  },
  {
    id: "google",
    label: "Google Ads",
    icon: Chrome,
    color: "text-source-google",
    path: "/leads/google",
  },
];

const mockNotifications = [
  {
    id: "1",
    title: "New lead from Website",
    message: "John Doe submitted a contact form",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Meta Ads update",
    message: "Summer Sale campaign received 5 new leads",
    time: "15 min ago",
    read: false,
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname === path;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-[60] bg-primary text-primary-foreground p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50 border-r border-sidebar-border transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-sidebar-foreground/70"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-lg font-bold">LeadFlow</h1>
          <p className="text-xs text-sidebar-foreground/60">
            Management System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs uppercase text-sidebar-foreground/50 mb-3 px-3">
            Main
          </p>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}

          <p className="text-xs uppercase text-sidebar-foreground/50 mt-6 mb-3 px-3">
            Sources
          </p>

          {sourceItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
              )}
            >
              <item.icon className={cn("w-5 h-5", item.color)} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
