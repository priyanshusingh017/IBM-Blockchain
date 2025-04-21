
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock doctor data
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    availability: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Hematologist",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    availability: ["10:00 AM", "1:00 PM", "3:30 PM"],
  },
  {
    id: "3",
    name: "Dr. Jessica Patel",
    specialty: "Endocrinologist",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    availability: ["8:30 AM", "12:00 PM", "3:00 PM", "5:30 PM"],
  },
];

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment is scheduled for ${format(selectedDate, "PPP")} at ${selectedTime}.`,
    });
    
    setLoading(false);
    navigate("/appointments");
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Book Doctor Appointment</h1>
        <p className="text-muted-foreground mt-2">
          Schedule a consultation with a specialist to discuss your health concerns
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Choose your preferred doctor, date, and time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Select Doctor</Label>
              <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
                {mockDoctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      selectedDoctor === doctor.id ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={doctor.id} id={`doctor-${doctor.id}`} />
                      <Avatar>
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Label htmlFor={`doctor-${doctor.id}`} className="text-base font-medium">
                          {doctor.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded">
                      <Clock className="h-3 w-3" />
                      <span>Available Today</span>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDoctor && 
                      mockDoctors
                        .find(doc => doc.id === selectedDoctor)
                        ?.availability.map((time, index) => (
                          <SelectItem key={index} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                    {!selectedDoctor && (
                      <SelectItem value="placeholder" disabled>
                        Select a doctor first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <textarea
                id="reason"
                className="w-full p-3 border rounded-md"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your health concerns or symptoms..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleBookAppointment} disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
              <p>Please arrive 15 minutes before your scheduled appointment time.</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
              <p>Bring your identification, insurance card, and any previous medical records if available.</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
              <p>If you need to cancel, please do so at least 24 hours in advance.</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
              <p>A consultation fee may apply depending on your insurance coverage.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
