
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "123-456-7890", // Example data
    address: "123 Main St, City, Country", // Example data
    bloodType: "O+", // Example data
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-xl">{user?.name ? getInitials(user.name) : <User />}</AvatarFallback>
            </Avatar>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription className="capitalize">{user?.role}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mt-2 grid gap-2">
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p>{user?.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Member since:</span>
                <p>March 2024</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setEditing(!editing)}
            >
              {editing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Profile Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={true} // Email should not be editable
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input 
                    id="bloodType"
                    name="bloodType"
                    value={profileData.bloodType}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {editing && (
              <>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
          </CardFooter>
        </Card>

        {/* Reports Summary Card */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
            <CardDescription>
              Overview of your recent health reports and appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Recent Reports</h3>
                <p className="text-muted-foreground">2 reports in the last 30 days</p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => window.location.href = "/reports"}>
                  View Reports
                </Button>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Upcoming Appointments</h3>
                <p className="text-muted-foreground">1 appointment scheduled</p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => window.location.href = "/appointments"}>
                  View Appointments
                </Button>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Health Alerts</h3>
                <p className="text-muted-foreground">No critical alerts</p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => window.location.href = "/reports"}>
                  Check All Alerts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
