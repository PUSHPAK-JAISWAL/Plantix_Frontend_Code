import { ReactNode } from 'react';
import { NavLink } from '@/components/NavLink';
import { Home, Scan, Book, List, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">PlantHealth</h1>
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
              activeClassName="text-primary scale-110"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </NavLink>
            
            <NavLink
              to="/dashboard"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
              activeClassName="text-primary scale-110"
            >
              <LayoutDashboard className="h-6 w-6" />
              <span className="text-xs">Dashboard</span>
            </NavLink>
            
            <NavLink
              to="/scan"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
              activeClassName="text-primary scale-110"
            >
              <div className="h-14 w-14 -mt-6 rounded-full bg-primary flex items-center justify-center shadow-lg glow-effect">
                <Scan className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-xs">Scan</span>
            </NavLink>
            
            <NavLink
              to="/library"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
              activeClassName="text-primary scale-110"
            >
              <Book className="h-6 w-6" />
              <span className="text-xs">Library</span>
            </NavLink>
            
            <NavLink
              to="/my-plants"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
              activeClassName="text-primary scale-110"
            >
              <List className="h-6 w-6" />
              <span className="text-xs">My Plants</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
