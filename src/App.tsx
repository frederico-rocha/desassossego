import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TeamMember from "./pages/TeamMember.tsx";
import Clinic from "./pages/Clinic.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <BrowserRouter basename="/desassossego"> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipa/:slug" element={<TeamMember />} />
          <Route path="/psicologia-lisboa" element={<Clinic clinic="lisboa" />} />
          <Route path="/psicologia-cascais" element={<Clinic clinic="cascais" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
