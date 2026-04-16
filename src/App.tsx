import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import BadgeToast from "@/components/BadgeToast";
import OnboardingModal from "@/components/OnboardingModal";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import BlogArticlePage from "./pages/BlogArticlePage.tsx";
import AdminBlogsPage from "./pages/AdminBlogsPage.tsx";
import AdminBlogEditorPage from "./pages/AdminBlogEditorPage.tsx";
import RacketTestPage from "./pages/RacketTestPage.tsx";
import OutfitPage from "./pages/OutfitPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <BadgeToast />
          <OnboardingModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/registreren" element={<RegisterPage />} />
            <Route path="/inloggen" element={<LoginPage />} />
            <Route path="/wachtwoord-vergeten" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profiel" element={<ProfilePage />} />
            <Route path="/speler/:username" element={<ProfilePage />} />
            <Route path="/blogs/:slug" element={<BlogArticlePage />} />
            <Route path="/admin/blogs" element={<AdminBlogsPage />} />
            <Route path="/admin/blogs/nieuw" element={<AdminBlogEditorPage />} />
            <Route path="/admin/blogs/:id/bewerken" element={<AdminBlogEditorPage />} />
            <Route path="/racket-test" element={<RacketTestPage />} />
            <Route path="/outfit" element={<OutfitPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
