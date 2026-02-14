import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  IconClipboardList, 
  IconClock, 
  IconCircleCheck, 
  IconAlertTriangle,
  IconEye,
  IconMessageCircle 
} from "@tabler/icons-react";

interface StaffDashboardProps {
  staff: {
    name: string;
    department: string;
    assignedComplaints: number;
    resolvedToday: number;
  };
}

// Mock complaints data
const complaints = [
  {
    id: 'ELE-123456',
    title: 'Street light not working',
    citizen: 'Rajesh Kumar',
    priority: 'medium',
    status: 'pending',
    assignedAt: '2024-01-20 10:30',
    location: 'MG Road, Pune',
  },
  {
    id: 'ELE-123457',
    title: 'Power outage in residential area',
    citizen: 'Priya Sharma',
    priority: 'high',
    status: 'in_progress',
    assignedAt: '2024-01-20 09:15',
    location: 'Koregaon Park, Pune',
  },
  {
    id: 'ELE-123458',
    title: 'Damaged electrical pole',
    citizen: 'Amit Patel',
    priority: 'high',
    status: 'pending',
    assignedAt: '2024-01-20 08:45',
    location: 'FC Road, Pune',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-warning/10 text-warning';
    case 'in_progress': return 'bg-info/10 text-info';
    case 'resolved': return 'bg-secondary/10 text-secondary';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive/10 text-destructive';
    case 'medium': return 'bg-warning/10 text-warning';
    case 'low': return 'bg-secondary/10 text-secondary';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

export const StaffDashboard = ({ staff }: StaffDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assigned</CardTitle>
              <IconClipboardList className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.assignedComplaints}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <IconClock className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {complaints.filter(c => c.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <IconAlertTriangle className="h-4 w-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {complaints.filter(c => c.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
              <IconCircleCheck className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{staff.resolvedToday}</div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Complaints</CardTitle>
          <CardDescription>Manage and respond to citizen grievances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{complaint.title}</h3>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ticket ID: {complaint.id} • Citizen: {complaint.citizen}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Location: {complaint.location} • Assigned: {complaint.assignedAt}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <IconEye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconMessageCircle className="h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};