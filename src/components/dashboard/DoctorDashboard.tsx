
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, FileText, MessageSquare, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 patients since last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Next: John Doe at 10:30 AM
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Waiting for your review
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-medical-alert border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-alert">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-medical-alert" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-alert">2</div>
            <p className="text-xs text-muted-foreground">
              Patients need immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your scheduled consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Today • 10:30 AM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/appointments/4")}>
                  View
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/women/4.jpg" />
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Emma Johnson</p>
                    <p className="text-xs text-muted-foreground">Today • 1:45 PM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/appointments/5")}>
                  View
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/5.jpg" />
                    <AvatarFallback>DW</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">David Wilson</p>
                    <p className="text-xs text-muted-foreground">Tomorrow • 9:15 AM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/appointments/6")}>
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Pending Report Reviews</CardTitle>
            <CardDescription>
              Reports waiting for your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Lipid Panel • Uploaded 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/5")}>
                  Review
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded border-medical-alert border">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/women/4.jpg" />
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Emma Johnson</p>
                    <p className="text-xs text-medical-alert">Urgent: Critical values</p>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => navigate("/reports/6")}>
                  Review
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/5.jpg" />
                    <AvatarFallback>DW</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">David Wilson</p>
                    <p className="text-xs text-muted-foreground">Metabolic Panel • Uploaded yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/reports/7")}>
                  Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Messages</CardTitle>
          <CardDescription>
            Recent messages from your patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">I've been experiencing headaches after taking the new medication...</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Reply
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/women/4.jpg" />
                  <AvatarFallback>EJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Emma Johnson</p>
                  <p className="text-xs text-muted-foreground">Thank you for explaining my lab results yesterday. I have a follow-up question...</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Reply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
