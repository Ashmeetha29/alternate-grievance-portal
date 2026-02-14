import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface DepartmentCardProps {
  department: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    pendingCount?: number;
    color: string;
  };
  onSelect: (departmentId: string) => void;
  showStats?: boolean;
}

export const DepartmentCard = ({ department, onSelect, showStats = false }: DepartmentCardProps) => {
  const { t } = useLanguage();
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${department.color}`}>
            {department.icon}
          </div>
          {showStats && department.pendingCount !== undefined && (
            <Badge variant={department.pendingCount > 0 ? "destructive" : "secondary"}>
              {department.pendingCount} {t('departments.pending')}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {department.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm mb-4 line-clamp-2">
          {department.description}
        </CardDescription>
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => onSelect(department.id)}
        >
          {t('departments.selectDepartment')}
        </Button>
      </CardContent>
    </Card>
  );
};