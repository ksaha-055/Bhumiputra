import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Globe, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const closeSheet = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'bn', label: 'বাংলা' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-agri-primary">
          <img src="/logo.svg" alt="Kisan Connect" className="h-8 w-8" />
          <span>BHUMIPUTRA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6 flex-1">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-agri-accent">
            {t('home')}
          </Link>
          <Link to="/forecasting" className="text-sm font-medium transition-colors hover:text-agri-accent">
            {t('forecasting')}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change Language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => setLanguage(option.code as 'en' | 'hi' | 'bn')}
                  className={language === option.code ? 'bg-accent' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="User Account"
                onClick={() => navigate('/profile')}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="default" className="bg-agri-primary hover:bg-agri-dark" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="bg-agri-primary hover:bg-agri-dark"
              onClick={() => navigate('/auth')}
            >
              {t('login')}
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-agri-light border-agri-primary">
            <div className="flex flex-col gap-8 py-6">
              <div className="flex items-center gap-2 font-bold text-xl text-agri-primary">
                <img src="/logo.svg" alt="Kisan Connect" className="h-6 w-6" />
                <span>Kisan Connect</span>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-base font-medium" onClick={closeSheet}>
                  {t('home')}
                </Link>
                <Link to="/forecasting" className="text-base font-medium" onClick={closeSheet}>
                  {t('forecasting')}
                </Link>
              </nav>
              <div className="flex flex-col gap-4">
                {languageOptions.map((option) => (
                  <Button
                    key={option.code}
                    variant={language === option.code ? 'default' : 'ghost'}
                    onClick={() => {
                      setLanguage(option.code as 'en' | 'hi' | 'bn');
                      closeSheet();
                    }}
                    className="justify-start"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
