import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { setLeads } from "@/store/leadSlice";
import { mockLeads } from "@/data/mockLeads";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AllLeads from "./pages/AllLeads";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import WebsiteLeads from "./pages/WebsiteLeads";
import MetaLeads from "./pages/MetaLeads";
import GoogleLeads from "./pages/GoogleLeads";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(setLeads(mockLeads));
  }, []);

  return <>{children}</>;
}

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppInitializer>
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alleads" element={<AllLeads />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/leads/website" element={<WebsiteLeads />} />
                <Route path="/leads/meta" element={<MetaLeads />} />
                <Route path="/leads/google" element={<GoogleLeads />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppInitializer>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
