
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ReportUpload = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUploading(false);
    setUploadComplete(true);
    
    // Simulate AI analysis
    setAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAnalyzing(false);
    
    toast({
      title: "Report Analysis Complete",
      description: "Your blood report has been successfully analyzed.",
    });
    
    // Navigate to the report view page (using a dummy report ID)
    navigate("/reports/new");
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload Blood Report</h1>
        <p className="text-muted-foreground mt-2">
          Upload your blood test report (PDF) and our AI will analyze it for you
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Report Upload</CardTitle>
          <CardDescription>
            Drag and drop your PDF file or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                dragging ? "border-primary bg-primary/5" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop your file here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF files up to 10MB
                </p>
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer">Browse Files</Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary/50 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="text-destructive"
                >
                  Remove
                </Button>
              </div>

              {uploadComplete && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-md flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                  <span>Upload complete</span>
                </div>
              )}

              {analyzing && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-md flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span>AI is analyzing your report...</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/reports")}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || analyzing}
          >
            {uploading ? "Uploading..." : analyzing ? "Analyzing..." : "Upload & Analyze"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium">Upload Your Report</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your blood test PDF report from any lab
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI extracts and analyzes all key parameters from your report
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium">Get Health Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive easy-to-understand insights about your health metrics
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="font-medium">Consult with Doctor</h3>
                <p className="text-sm text-muted-foreground">
                  Book an appointment with a doctor to discuss your results
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportUpload;
