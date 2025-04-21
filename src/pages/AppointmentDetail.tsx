
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, FileText, Video, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// This would come from an API in a real application
const mockAppointmentDetails = {
  id: "1",
  doctor: {
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    qualifications: "MD, FACC",
    experience: "15+ years",
  },
  date: "June 18, 2023",
  time: "10:00 AM",
  duration: "30 minutes",
  type: "In-person",
  status: "confirmed",
  location: "Medical Center, 123 Health St, Suite 204",
  reasonForVisit: "Follow-up on recent blood work results",
  notes: "Please bring your previous prescription and any new symptoms you'd like to discuss.",
};

const AppointmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you'd fetch appointment data based on the ID
  // const { data: appointment, isLoading } = useQuery(['appointment', id], () => fetchAppointment(id));
  
  // Using mock data for now
  const appointment = mockAppointmentDetails;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 pl-0 hover:pl-2 transition-all"
        onClick={() => navigate('/appointments')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </Button>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Appointment Details</h1>
        <Badge className="bg-green-500 text-white">Confirmed</Badge>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={appointment.doctor.avatar} />
              <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">{appointment.doctor.name}</h3>
              <p className="text-muted-foreground">{appointment.doctor.specialty}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>Qualifications: {appointment.doctor.qualifications}</p>
                <p>Experience: {appointment.doctor.experience}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-muted-foreground">{appointment.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-muted-foreground">{appointment.time} ({appointment.duration})</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Appointment Type</p>
                <p className="text-muted-foreground">{appointment.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-muted-foreground">{appointment.location}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="font-medium mb-1">Reason for Visit</p>
            <p className="text-muted-foreground">{appointment.reasonForVisit}</p>
          </div>
          
          <div>
            <p className="font-medium mb-1">Additional Notes</p>
            <p className="text-muted-foreground">{appointment.notes}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-3">
        <Button variant="destructive" className="flex-1">Cancel Appointment</Button>
        <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={() => navigate('/appointments/book')}>
          <FileText className="h-4 w-4" />
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetail;
