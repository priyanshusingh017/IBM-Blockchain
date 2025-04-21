
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, PlusCircle, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Dummy data for reports
const dummyReports = [
  {
    id: "rep-001",
    title: "Complete Blood Count",
    date: "2023-03-15",
    lab: "LifeCare Labs",
    status: "normal",
    highlights: ["Normal RBC count", "Normal WBC count", "Normal platelet count"]
  },
  {
    id: "rep-002",
    title: "Lipid Profile",
    date: "2023-02-10",
    lab: "MedTest Diagnostics",
    status: "abnormal",
    highlights: ["Elevated LDL cholesterol", "Normal HDL cholesterol", "High triglycerides"]
  },
  {
    id: "rep-003",
    title: "Liver Function Test",
    date: "2023-01-05",
    lab: "HealthFirst Diagnostics",
    status: "normal",
    highlights: ["Normal ALT levels", "Normal AST levels", "Normal bilirubin levels"]
  },
  {
    id: "new",
    title: "Blood Sugar Test",
    date: "2023-03-25",
    lab: "QuickHealth Labs",
    status: "critical",
    highlights: ["High fasting glucose", "Elevated HbA1c", "Consider diabetes management"]
  }
];

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all"); // all, normal, abnormal, critical

  const filteredReports = filter === "all" 
    ? dummyReports 
    : dummyReports.filter(report => report.status === filter);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "abnormal":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Health Reports</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all your blood test reports
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => navigate("/reports/upload")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload New Report
          </Button>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "normal" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("normal")}
            >
              Normal
            </Button>
            <Button 
              variant={filter === "abnormal" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("abnormal")}
            >
              Abnormal
            </Button>
            <Button 
              variant={filter === "critical" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("critical")}
            >
              Critical
            </Button>
          </div>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No reports found</h2>
          <p className="text-muted-foreground mb-4">
            There are no reports matching your filter criteria.
          </p>
          <Button onClick={() => setFilter("all")}>Show All Reports</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-2">Lab: {report.lab}</p>
                <p className="text-sm font-medium">Key Findings:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                  {report.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-secondary/10 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate(`/reports/${report.id}`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
