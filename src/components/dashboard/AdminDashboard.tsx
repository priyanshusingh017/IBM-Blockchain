
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  User, 
  FileText, 
  Calendar, 
  Plus, 
  Settings,
  BarChart 
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex space-x-2">
          <Button onClick={() => navigate("/doctors/add")} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Doctor
          </Button>
          <Button variant="outline" onClick={() => navigate("/settings")} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">
              +18 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 new doctors this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">587</div>
            <p className="text-xs text-muted-foreground">
              +42 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>
              System activity for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="text-center">
                <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-xl font-semibold">Usage Analytics</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Charts and analytics would be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">New Doctor Added</p>
                  <p className="text-xs text-muted-foreground">Dr. James Wilson was added to the system</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Patient Report Uploaded</p>
                  <p className="text-xs text-muted-foreground">John Doe uploaded a new blood test report</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              
              <div className="p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">System Backup Complete</p>
                  <p className="text-xs text-muted-foreground">Automated system backup successfully completed</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 11:30 PM</p>
                </div>
              </div>
              
              <div className="p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Doctor Assignment</p>
                  <p className="text-xs text-muted-foreground">5 new patients assigned to Dr. Sarah Smith</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 3:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>
                Manage all doctor accounts
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/doctors")}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dr. Sarah Smith</p>
                  <p className="text-xs text-muted-foreground">Cardiologist • 32 patients</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/doctors/edit/1")}>
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Hematologist • 28 patients</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/doctors/edit/2")}>
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dr. Jessica Patel</p>
                  <p className="text-xs text-muted-foreground">Endocrinologist • 21 patients</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/doctors/edit/3")}>
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Latest uploaded blood reports
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/reports")}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Lipid Panel • 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/10")}>
                  View
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Emma Johnson</p>
                  <p className="text-xs text-muted-foreground">Full Blood Count • 5 hours ago</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/11")}>
                  View
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">David Wilson</p>
                  <p className="text-xs text-muted-foreground">Metabolic Panel • Yesterday</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/12")}>
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
