import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const AiVideoStrategy = lazy(() => import("./pages/AiVideoStrategy.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#0B0A0D] flex items-center justify-center text-white/50 font-mono text-xs">Loading experience...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/ai-video-strategy" element={<AiVideoStrategy />} />
            <Route path="/services" element={<AiVideoStrategy />} />
            <Route path="/ai-video-strategy" element={<AiVideoStrategy />} />
            <Route path="/thank-you-page" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
