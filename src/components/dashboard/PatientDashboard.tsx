
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Calendar, AlertTriangle } from "lucide-react";

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>
        <Button onClick={() => navigate("/reports/upload")} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload New Report
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 report from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Next: Dr. Sarah Smith on Friday
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-medical-alert border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-alert">Health Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-medical-alert" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-alert">1</div>
            <p className="text-xs text-muted-foreground">
              High cholesterol detected
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Your most recent blood test reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Full Blood Count</p>
                  <p className="text-xs text-muted-foreground">Jun 12, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/1")}>
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Lipid Panel</p>
                  <p className="text-xs text-muted-foreground">Apr 23, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/2")}>
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Metabolic Panel</p>
                  <p className="text-xs text-muted-foreground">Feb 15, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/3")}>
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your scheduled doctor consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dr. Sarah Smith</p>
                  <p className="text-xs text-muted-foreground">Jun 18, 2023 • 10:00 AM</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/appointments/1")}>
                  Details
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Jul 02, 2023 • 2:30 PM</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/appointments/2")}>
                  Details
                </Button>
              </div>
              
              <div className="pt-4">
                <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate("/appointments/book")}>
                  Book New Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
