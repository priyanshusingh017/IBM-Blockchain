
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, AlertTriangle, FileText, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

// Mock blood test data
const mockBloodTestData = {
  patient: {
    name: "John Doe",
    age: 42,
    gender: "Male",
    patientId: "P12345"
  },
  doctor: {
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist"
  },
  reportInfo: {
    id: "RPT-78923",
    type: "Comprehensive Metabolic Panel",
    date: "June 15, 2023",
    lab: "HealthLife Labs"
  },
  parameters: [
    {
      name: "Hemoglobin",
      value: 14.2,
      unit: "g/dL",
      range: "13.5-17.5",
      status: "normal" // normal, high, low
    },
    {
      name: "White Blood Cells",
      value: 9.8,
      unit: "10³/µL",
      range: "4.5-11.0",
      status: "normal"
    },
    {
      name: "Platelets",
      value: 140,
      unit: "10³/µL",
      range: "150-450",
      status: "low"
    },
    {
      name: "Total Cholesterol",
      value: 240,
      unit: "mg/dL",
      range: "< 200",
      status: "high"
    },
    {
      name: "LDL Cholesterol",
      value: 165,
      unit: "mg/dL",
      range: "< 100",
      status: "high"
    },
    {
      name: "HDL Cholesterol",
      value: 45,
      unit: "mg/dL",
      range: "> 40",
      status: "normal"
    },
    {
      name: "Triglycerides",
      value: 190,
      unit: "mg/dL",
      range: "< 150",
      status: "high"
    },
    {
      name: "Glucose (Fasting)",
      value: 112,
      unit: "mg/dL",
      range: "70-100",
      status: "high"
    },
    {
      name: "Creatinine",
      value: 0.9,
      unit: "mg/dL",
      range: "0.7-1.3",
      status: "normal"
    },
    {
      name: "Blood Urea Nitrogen",
      value: 18,
      unit: "mg/dL",
      range: "7-20",
      status: "normal"
    }
  ],
  aiSummary: {
    keyFindings: [
      "Your cholesterol levels are elevated, particularly LDL (bad) cholesterol.",
      "Your triglycerides are higher than the recommended range.",
      "Your fasting glucose is slightly elevated, indicating pre-diabetic tendencies.",
      "Your platelet count is slightly below the normal range."
    ],
    interpretation: "Your results indicate hyperlipidemia (high cholesterol) and signs of pre-diabetes. The elevated LDL cholesterol and triglycerides increase your risk for cardiovascular disease. Your slightly low platelet count may be normal variation but should be monitored.",
    criticalAlerts: [
      "High cholesterol significantly increases your risk of heart disease and stroke."
    ],
    recommendations: [
      "Dietary changes: Reduce saturated fat intake, increase fiber, and limit processed foods and sugars.",
      "Physical activity: Aim for at least 150 minutes of moderate exercise per week.",
      "Consider discussing medication options with your doctor if lifestyle changes aren't sufficient.",
      "Schedule a follow-up test in 3 months to monitor cholesterol and glucose levels."
    ]
  },
  doctorNotes: "Patient shows signs of metabolic syndrome. Recommending lifestyle modifications and considering statin therapy if no improvement in 3 months. Follow-up appointment scheduled."
};

const ReportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctorComment, setDoctorComment] = useState(mockBloodTestData.doctorNotes);

  // Determine if the user is a doctor
  const isDoctor = user?.role === "doctor";
  
  const handleBookAppointment = () => {
    navigate("/appointments/book");
  };

  const handleSaveComment = () => {
    // In a real app, this would save to a database
    alert("Doctor's comments saved successfully!");
  };

  const getValueClass = (status: string) => {
    switch (status) {
      case "high":
        return "text-medical-alert";
      case "low":
        return "text-medical-warning";
      default:
        return "text-medical-success";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blood Test Report</h1>
          <p className="text-muted-foreground mt-1">
            {mockBloodTestData.reportInfo.type} • {mockBloodTestData.reportInfo.date}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          {!isDoctor && (
            <Button size="sm" className="flex items-center gap-1" onClick={handleBookAppointment}>
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Button>
          )}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Patient</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Name:</span> {mockBloodTestData.patient.name}</p>
                <p><span className="font-medium">Age:</span> {mockBloodTestData.patient.age}</p>
                <p><span className="font-medium">Gender:</span> {mockBloodTestData.patient.gender}</p>
                <p><span className="font-medium">ID:</span> {mockBloodTestData.patient.patientId}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Report Details</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Report ID:</span> {mockBloodTestData.reportInfo.id}</p>
                <p><span className="font-medium">Type:</span> {mockBloodTestData.reportInfo.type}</p>
                <p><span className="font-medium">Date:</span> {mockBloodTestData.reportInfo.date}</p>
                <p><span className="font-medium">Laboratory:</span> {mockBloodTestData.reportInfo.lab}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          {isDoctor && <TabsTrigger value="doctor">Doctor's Notes</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Blood Test Parameters</CardTitle>
              <CardDescription>
                Results compared to normal reference ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {mockBloodTestData.parameters.map((param, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{param.name}</p>
                      <p className="text-sm text-muted-foreground">Reference: {param.range} {param.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getValueClass(param.status)}`}>
                        {param.value} {param.unit}
                      </p>
                      <p className={`text-sm capitalize ${getValueClass(param.status)}`}>
                        {param.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                AI-generated insights based on your test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Findings</h3>
                  <ul className="space-y-2">
                    {mockBloodTestData.aiSummary.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
                        <p>{finding}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Medical Interpretation</h3>
                  <p>{mockBloodTestData.aiSummary.interpretation}</p>
                </div>
                
                <Separator />
                
                {mockBloodTestData.aiSummary.criticalAlerts.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-medical-alert flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-medical-alert mb-2">Critical Alerts</h3>
                        <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                          {mockBloodTestData.aiSummary.criticalAlerts.map((alert, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-medical-alert" />
                              <p>{alert}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Personalized recommendations based on your test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBloodTestData.aiSummary.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <p>{rec}</p>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-secondary rounded-md">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Important Note</h3>
                      <p className="text-sm text-muted-foreground">
                        These recommendations are generated by AI and are not a substitute for professional medical advice. 
                        Please consult with a healthcare provider before making any changes to your lifestyle or medication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBookAppointment} className="w-full">
                Book Doctor Consultation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {isDoctor && (
          <TabsContent value="doctor">
            <Card>
              <CardHeader>
                <CardTitle>Doctor's Notes</CardTitle>
                <CardDescription>
                  Add your medical assessment and notes for this report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-2">
                      Medical Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={5}
                      className="w-full p-3 border rounded-md"
                      value={doctorComment}
                      onChange={(e) => setDoctorComment(e.target.value)}
                      placeholder="Enter your medical assessment and recommendations..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="criticalFlag"
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="criticalFlag" className="text-sm font-medium">
                      Flag as requiring immediate attention
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveComment}>Save Comments</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {!isDoctor && (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Doctor's Assessment</CardTitle>
              <CardDescription>
                Notes and recommendations from your doctor
              </CardDescription>
            </div>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {doctorComment ? (
              <div className="p-4 bg-secondary/50 rounded-md">
                <p className="italic">{doctorComment}</p>
              </div>
            ) : (
              <div className="p-4 bg-secondary/50 rounded-md text-muted-foreground italic">
                Your doctor hasn't added any comments yet.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportView;
