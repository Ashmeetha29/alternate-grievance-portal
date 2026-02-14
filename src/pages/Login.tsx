import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconUser, IconShield, IconLogin, IconWorld } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, languages } from "@/contexts/LanguageContext";

interface LoginProps {
  onLogin: (user: { name: string; type: 'citizen' | 'staff'; department?: string }) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [citizenForm, setCitizenForm] = useState({ mobile: '', name: '', email: '' });
  const [staffForm, setStaffForm] = useState({ employeeId: '', password: '', department: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();

  const handleCitizenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!citizenForm.mobile || !citizenForm.name || (isSignup && !citizenForm.email)) {
      toast({
        title: t('common.fillRequired'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: citizenForm.name,
        type: 'citizen',
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!staffForm.employeeId || !staffForm.password) {
      toast({
        title: t('common.fillAll'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: 'Staff Member',
        type: 'staff',
        department: 'Electricity',
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8 text-primary-foreground">
          {/* Language Selector */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <IconWorld className="h-4 w-4 text-primary-foreground/80" />
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-primary-foreground border border-primary-foreground/20 rounded px-2 py-1 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-foreground bg-background">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('header.municipalPortal')}</h1>
          <p className="text-primary-foreground/80">{t('header.grievanceSystem')}</p>
        </div>

        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle>{isSignup ? t('auth.createAccount') : t('auth.welcome')}</CardTitle>
            <CardDescription>
              {isSignup ? t('auth.signUpDescription') : t('auth.signInDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="citizen" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="citizen" className="flex items-center space-x-2">
                  <IconUser className="h-4 w-4" />
                  <span>{t('auth.citizen')}</span>
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex items-center space-x-2" disabled={isSignup}>
                  <IconShield className="h-4 w-4" />
                  <span>{t('auth.staff')}</span>
                </TabsTrigger>
              </TabsList>

              {/* Citizen Login */}
              <TabsContent value="citizen">
                {isSignup && (
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {t('auth.staffAdminOnly')}
                  </p>
                )}
                <form onSubmit={handleCitizenLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">{t('auth.mobile')}</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder={t('auth.mobilePlaceholder')}
                      value={citizenForm.mobile}
                      onChange={(e) => setCitizenForm(prev => ({ ...prev, mobile: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('auth.fullName')}</Label>
                    <Input
                      id="name"
                      placeholder={t('auth.fullNamePlaceholder')}
                      value={citizenForm.name}
                      onChange={(e) => setCitizenForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  {isSignup && (
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('auth.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        value={citizenForm.email}
                        onChange={(e) => setCitizenForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                    {isLoading ? (isSignup ? t('auth.creatingAccount') : t('auth.signingIn')) : (
                      <>
                        <IconLogin className="h-4 w-4 mr-2" />
                        {isSignup ? t('auth.createCitizenAccount') : t('auth.signInCitizen')}
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-sm"
                    >
                      {isSignup ? t('auth.alreadyAccount') : t('auth.newUser')}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Staff Login */}
              <TabsContent value="staff">
                <form onSubmit={handleStaffLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">{t('auth.employeeId')}</Label>
                    <Input
                      id="employeeId"
                      placeholder={t('auth.employeeIdPlaceholder')}
                      value={staffForm.employeeId}
                      onChange={(e) => setStaffForm(prev => ({ ...prev, employeeId: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('auth.passwordPlaceholder')}
                      value={staffForm.password}
                      onChange={(e) => setStaffForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                    {isLoading ? t('auth.signingIn') : (
                      <>
                        <IconLogin className="h-4 w-4 mr-2" />
                        {t('auth.signInStaff')}
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-primary-foreground/60 mt-6">
          {t('auth.secureAccess')}
        </p>
      </div>
    </div>
  );
};