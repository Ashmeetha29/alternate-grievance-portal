import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { DepartmentCard } from "@/components/DepartmentCard";
import { ComplaintForm } from "@/components/ComplaintForm";
import { StaffDashboard } from "@/components/StaffDashboard";
import { Login } from "@/pages/Login";
import { 
  IconBolt, 
  IconDroplet, 
  IconRoad, 
  IconBuildingHospital, 
  IconDropletHeart 
} from "@tabler/icons-react";

// Department definitions will be created dynamically based on translations
const getDepartments = (t: any) => [
  {
    id: 'electricity',
    name: t('departments.electricity'),
    description: t('departments.electricityDesc'),
    icon: <IconBolt className="h-6 w-6 text-accent-foreground" />,
    color: 'bg-accent text-accent-foreground',
    pendingCount: 12,
  },
  {
    id: 'water_supply',
    name: t('departments.waterSupply'),
    description: t('departments.waterSupplyDesc'),
    icon: <IconDroplet className="h-6 w-6 text-info-foreground" />,
    color: 'bg-info text-info-foreground',
    pendingCount: 8,
  },
  {
    id: 'roads_transport',
    name: t('departments.roadsTransport'),
    description: t('departments.roadsTransportDesc'),
    icon: <IconRoad className="h-6 w-6 text-secondary-foreground" />,
    color: 'bg-secondary text-secondary-foreground',
    pendingCount: 15,
  },
  {
    id: 'health_sanitation',
    name: t('departments.healthSanitation'),
    description: t('departments.healthSanitationDesc'),
    icon: <IconBuildingHospital className="h-6 w-6 text-primary-foreground" />,
    color: 'bg-primary text-primary-foreground',
    pendingCount: 6,
  },
  {
    id: 'sewage_drainage',
    name: t('departments.sewageDrainage'),
    description: t('departments.sewageDrainageDesc'),
    icon: <IconDropletHeart className="h-6 w-6 text-warning-foreground" />,
    color: 'bg-warning text-warning-foreground',
    pendingCount: 4,
  },
];

type User = {
  name: string;
  type: 'citizen' | 'staff';
  department?: string;
};

type Location = {
  state: string;
  district: string;
};

type AppStep = 'login' | 'location' | 'departments' | 'complaint' | 'staff_dashboard';

const Index = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<AppStep>('login');
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.type === 'staff') {
      setCurrentStep('staff_dashboard');
    } else {
      setCurrentStep('location');
    }
  };

  const handleLocationSelect = (locationData: Location) => {
    setLocation(locationData);
    setCurrentStep('departments');
  };

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setCurrentStep('complaint');
  };

  const handleComplaintSubmit = (complaint: any) => {
    console.log('Complaint submitted:', complaint);
    // Reset to departments view after successful submission
    setCurrentStep('departments');
    setSelectedDepartment(null);
  };

  const handleBackToDepartments = () => {
    setCurrentStep('departments');
    setSelectedDepartment(null);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      
      case 'location':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <LocationSelector 
              onLocationSelect={handleLocationSelect} 
              selectedLocation={location || undefined}
            />
          </div>
        );
      
      case 'departments':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t('departments.title')}</h1>
              <p className="text-muted-foreground">
                {t('departments.description')}
              </p>
              {location && (
                <p className="text-sm text-muted-foreground mt-2">
                  {t('common.location')} {location.district}, {location.state}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDepartments(t).map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  onSelect={handleDepartmentSelect}
                  showStats={user?.type === 'staff'}
                />
              ))}
            </div>
          </div>
        );
      
      case 'complaint':
        const department = getDepartments(t).find(d => d.id === selectedDepartment);
        if (!department) return null;
        
        return (
          <div className="max-w-2xl mx-auto p-6">
            <button 
              onClick={handleBackToDepartments}
              className="mb-4 text-primary hover:underline"
            >
              {t('complaint.backToDepartments')}
            </button>
            <ComplaintForm
              department={department}
              onSubmit={handleComplaintSubmit}
            />
          </div>
        );
      
      case 'staff_dashboard':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{t('staff.dashboard')}</h1>
              <p className="text-muted-foreground">
                {t('staff.welcomeBack').replace('{name}', user?.name || '').replace('{department}', user?.department || '')}
              </p>
            </div>
            <StaffDashboard
              staff={{
                name: user?.name || '',
                department: user?.department || '',
                assignedComplaints: 15,
                resolvedToday: 3,
              }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // Don't show header on login page
  if (currentStep === 'login') {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user || undefined}
      />
      {renderContent()}
    </div>
  );
};

export default Index;
