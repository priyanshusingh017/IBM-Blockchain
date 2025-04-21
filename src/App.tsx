
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportUpload from "./pages/ReportUpload";
import ReportView from "./pages/ReportView";
import AppointmentBooking from "./pages/AppointmentBooking";
import AppointmentDetail from "./pages/AppointmentDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Component to redirect authenticated users away from login
const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/reports" element={
        <ProtectedRoute>
          <MainLayout>
            <Reports />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/reports/upload" element={
        <ProtectedRoute>
          <MainLayout>
            <ReportUpload />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/reports/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <ReportView />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/appointments" element={
        <ProtectedRoute>
          <MainLayout>
            <Appointments />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/appointments/book" element={
        <ProtectedRoute>
          <MainLayout>
            <AppointmentBooking />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/appointments/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <AppointmentDetail />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
