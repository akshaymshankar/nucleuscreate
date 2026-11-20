import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollManager from "@/components/site/ScrollManager";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const Podcasts = lazy(() => import("./pages/Podcasts.tsx"));
const Agencies = lazy(() => import("./pages/Agencies.tsx"));
const Clipping = lazy(() => import("./pages/Clipping.tsx"));
const MotionGraphics = lazy(() => import("./pages/MotionGraphics.tsx"));
const AiVideoStrategy = lazy(() => import("./pages/AiVideoStrategy.tsx"));
const BreakingMoney = lazy(() => import("./pages/BreakingMoney.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <Suspense fallback={<div className="min-h-screen bg-[#0B0A0D] flex items-center justify-center text-white/50 font-mono text-xs">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/clipping" element={<Clipping />} />
            <Route path="/motion-graphics" element={<MotionGraphics />} />
            <Route path="/services/ai-video-strategy" element={<AiVideoStrategy />} />
            <Route path="/services" element={<AiVideoStrategy />} />
            <Route path="/ai-video-strategy" element={<AiVideoStrategy />} />
            <Route path="/case-studies/breaking-money" element={<BreakingMoney />} />
            <Route path="/thank-you-page" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
