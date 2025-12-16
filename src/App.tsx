import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import AllLeads from "./pages/AllLeads";
import Analytics from "./pages/Analytics";
import WebsiteLeads from "./pages/WebsiteLeads";
import MetaLeads from "./pages/MetaLeads";
import GoogleLeads from "./pages/GoogleLeads";
import NotFound from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alleads" element={<AllLeads />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leads/website" element={<WebsiteLeads />} />
            <Route path="/leads/meta" element={<MetaLeads />} />
            <Route path="/leads/google" element={<GoogleLeads />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
