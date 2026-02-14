import { Button } from "@/components/ui/button";
import { IconWorld, IconUser, IconMenu2 } from "@tabler/icons-react";
import { useLanguage, languages } from "@/contexts/LanguageContext";

interface HeaderProps {
  user?: {
    name: string;
    type: 'citizen' | 'staff';
  };
  onMenuClick?: () => void;
}

export const Header = ({ user, onMenuClick }: HeaderProps) => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <header className="bg-card border-b shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
              <IconMenu2 className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{t('header.municipalPortal')}</h1>
                <p className="text-xs text-muted-foreground">{t('header.grievanceSystem')}</p>
              </div>
            </div>
          </div>

          {/* Language selector and user menu */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="flex items-center space-x-2">
              <IconWorld className="h-4 w-4 text-muted-foreground" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="text-sm border-0 bg-transparent focus:ring-0 focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User info */}
            {user && (
              <div className="flex items-center space-x-2">
                <IconUser className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {t(`auth.${user.type}`)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};