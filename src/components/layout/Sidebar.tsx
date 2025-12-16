import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  Globe,
  Facebook,
  Chrome,
  LogOut,
  X,
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
    title: "Meta Ads campaign update",
    message: "Summer Sale campaign received 5 new leads",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    title: "Google Ads lead",
    message: "Sarah Johnson signed up via search ad",
    time: "1 hour ago",
    read: false,
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50 border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">
              LeadFlow
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs uppercase tracking-wider text-sidebar-foreground/50 mb-3 px-3">
          Main
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive(item.path)
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}

        <div className="pt-6">
          <p className="text-xs uppercase tracking-wider text-sidebar-foreground/50 mb-3 px-3">
            Sources
          </p>
          {sourceItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn("w-5 h-5", !isActive(item.path) && item.color)}
              />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Notifications and Profile */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <Bell className="w-5 h-5 mr-3" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="end"
            className="w-80 p-0 bg-card border-border"
          >
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground text-center">
                  No notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "p-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm font-medium text-foreground",
                            !notification.read && "font-semibold"
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notification.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        {/* <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button> */}
      </div>
    </aside>
  );
}
