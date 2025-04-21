
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LogOut, 
  Menu, 
  Home, 
  FileText, 
  Calendar, 
  Users, 
  User, 
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: "Dashboard", icon: <Home className="mr-2 h-4 w-4" />, path: "/" },
    ];

    switch (user?.role) {
      case "patient":
        return [
          ...baseItems,
          { name: "My Reports", icon: <FileText className="mr-2 h-4 w-4" />, path: "/reports" },
          { name: "Appointments", icon: <Calendar className="mr-2 h-4 w-4" />, path: "/appointments" },
          { name: "Profile", icon: <User className="mr-2 h-4 w-4" />, path: "/profile" },
        ];
      case "doctor":
        return [
          ...baseItems,
          { name: "Patient Reports", icon: <FileText className="mr-2 h-4 w-4" />, path: "/reports" },
          { name: "Appointments", icon: <Calendar className="mr-2 h-4 w-4" />, path: "/appointments" },
          { name: "Profile", icon: <User className="mr-2 h-4 w-4" />, path: "/profile" },
        ];
      case "admin":
        return [
          ...baseItems,
          { name: "Users", icon: <Users className="mr-2 h-4 w-4" />, path: "/users" },
          { name: "Doctors", icon: <User className="mr-2 h-4 w-4" />, path: "/doctors" },
          { name: "Reports", icon: <FileText className="mr-2 h-4 w-4" />, path: "/reports" },
          { name: "Settings", icon: <Settings className="mr-2 h-4 w-4" />, path: "/settings" },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();
  
  const renderNavigation = () => (
    <div className="space-y-4 py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold tracking-tight">
          Health Insights
        </h2>
        <p className="text-sm text-muted-foreground">
          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Portal
        </p>
      </div>
      <div className="px-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-4">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  {renderNavigation()}
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-lg font-semibold">AI Health Insight Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2">
              {user && (
                <>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={() => logout()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="hidden md:flex md:w-64 md:flex-col border-r">
            {renderNavigation()}
          </aside>
        )}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
