
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockAppointments = [
  {
    id: "1",
    doctor: {
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    date: "June 18, 2023",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    doctor: {
      name: "Dr. Michael Chen",
      specialty: "Hematologist",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    date: "July 2, 2023",
    time: "2:30 PM",
    status: "confirmed",
  },
  {
    id: "3",
    doctor: {
      name: "Dr. Jessica Patel",
      specialty: "Endocrinologist",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    date: "May 10, 2023",
    time: "3:45 PM",
    status: "completed",
  },
  {
    id: "4",
    doctor: {
      name: "Dr. Robert Johnson",
      specialty: "Neurologist",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    date: "May 2, 2023",
    time: "9:15 AM",
    status: "cancelled",
  },
];

const Appointments = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your scheduled doctor consultations
          </p>
        </div>
        <Button onClick={() => navigate("/appointments/book")} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Book New Appointment
        </Button>
      </div>

      <div className="grid gap-6">
        {mockAppointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className={`p-6 flex flex-col justify-between ${
                  appointment.status === "confirmed" 
                    ? "bg-green-50 dark:bg-green-950/20" 
                    : appointment.status === "completed"
                    ? "bg-blue-50 dark:bg-blue-950/20"
                    : appointment.status === "cancelled"
                    ? "bg-red-50 dark:bg-red-950/20"
                    : "bg-gray-50 dark:bg-gray-800/20"
                } md:w-1/4`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
                
                <div className="p-6 md:w-3/4">
                  <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.doctor.avatar} />
                        <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{appointment.doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.doctor.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                      {appointment.status === "confirmed" && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 md:flex-auto" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                            Details
                          </Button>
                          <Button variant="destructive" size="sm" className="flex-1 md:flex-auto">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === "completed" && (
                        <Button variant="outline" size="sm" className="flex-1 md:flex-auto" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                          View Summary
                        </Button>
                      )}
                      {appointment.status === "cancelled" && (
                        <Button variant="outline" size="sm" className="flex-1 md:flex-auto" onClick={() => navigate("/appointments/book")}>
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {appointment.status === "confirmed" && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md">
                      <p className="text-sm flex items-center gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Please arrive 15 minutes before your scheduled appointment time.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {mockAppointments.length === 0 && (
        <Card className="text-center p-8">
          <CardContent className="pt-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">No appointments scheduled</h3>
            <p className="text-muted-foreground mb-6">
              You don't have any appointments scheduled yet.
            </p>
            <Button onClick={() => navigate("/appointments/book")}>
              Book Your First Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Appointments;
