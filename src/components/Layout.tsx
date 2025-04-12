
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, CheckSquare, Home, PlusSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: <Home size={20} />, label: "Home" },
    { path: "/dashboard", icon: <PlusSquare size={20} />, label: "Projects" },
    { path: "/tasks", icon: <CheckSquare size={20} />, label: "Tasks" },
    { path: "/calendar", icon: <CalendarDays size={20} />, label: "Calendar" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" }
  ];
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 fixed inset-y-0 bg-sidebar border-r border-border z-30">
        <div className="h-16 flex items-center justify-center md:justify-start px-4 border-b border-border">
          <span className="hidden md:inline-block font-semibold text-xl">ProjectPilot</span>
          <span className="md:hidden font-semibold text-xl">PP</span>
        </div>
        <nav className="p-2 md:p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="hidden md:inline-block">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 ml-16 md:ml-64 min-h-screen">
        <div className="h-full p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
