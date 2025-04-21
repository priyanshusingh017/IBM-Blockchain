
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.role) {
    case "patient":
      return <PatientDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unknown user role</div>;
  }
};

export default Dashboard;
