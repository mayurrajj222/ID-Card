import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Download, RotateCcw, Upload, QrCode, GraduationCap } from "lucide-react";
import { downloadAsImage, downloadAsPDF } from "@/lib/downloadUtils";
import { useToast } from "@/components/ui/use-toast";

interface StudentData {
  name: string;
  studentId: string;
  college: string;
  course: string;
  photo: string | null;
  emergencyContact: string;
  email: string;
  phone: string;
}

type IDCardTemplate = 'modern' | 'classic' | 'minimal';

export default function Index() {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [template, setTemplate] = useState<IDCardTemplate>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Alex Johnson",
    studentId: "ST2024001",
    college: "University of Technology",
    course: "Computer Science",
    photo: null,
    emergencyContact: "+1 (555) 123-4567",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 987-6543"
  });

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setStudentData({
      name: "",
      studentId: "",
      college: "",
      course: "",
      photo: null,
      emergencyContact: "",
      email: "",
      phone: ""
    });
  };

  const downloadPDF = async () => {
    if (!studentData.name || !studentData.studentId) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the student name and ID before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadAsPDF('id-card-preview', `${studentData.name}-ID-Card`);
      toast({
        title: "Success!",
        description: "ID card PDF downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadImage = async () => {
    if (!studentData.name || !studentData.studentId) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the student name and ID before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadAsImage('id-card-preview', `${studentData.name}-ID-Card`);
      toast({
        title: "Success!",
        description: "ID card image downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-300`}>
      {/* Header */}
      <header className="border-b bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Student ID Generator</h1>
                <p className="text-sm text-muted-foreground">Create professional student ID cards</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Form */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={studentData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={studentData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      placeholder="Enter student ID"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    value={studentData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="Enter college/university name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course/Program</Label>
                  <Input
                    id="course"
                    value={studentData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    placeholder="Enter course or program"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={studentData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="student@university.edu"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={studentData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={studentData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact number"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo Upload</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Template Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={template} onValueChange={(value: IDCardTemplate) => setTemplate(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Design</SelectItem>
                    <SelectItem value="classic">Classic Academic</SelectItem>
                    <SelectItem value="minimal">Minimal Clean</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className={`p-2 border rounded-lg cursor-pointer transition-all ${template === 'modern' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`} onClick={() => setTemplate('modern')}>
                    <div className="w-full h-8 bg-gradient-to-r from-primary to-blue-600 rounded"></div>
                    <p className="text-xs text-center mt-1">Modern</p>
                  </div>
                  <div className={`p-2 border rounded-lg cursor-pointer transition-all ${template === 'classic' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`} onClick={() => setTemplate('classic')}>
                    <div className="w-full h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded"></div>
                    <p className="text-xs text-center mt-1">Classic</p>
                  </div>
                  <div className={`p-2 border rounded-lg cursor-pointer transition-all ${template === 'minimal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`} onClick={() => setTemplate('minimal')}>
                    <div className="w-full h-8 bg-gray-200 border rounded"></div>
                    <p className="text-xs text-center mt-1">Minimal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={downloadPDF}
                className="flex-1 min-w-[140px]"
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </Button>
              <Button
                onClick={downloadImage}
                variant="outline"
                className="flex-1 min-w-[140px]"
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Downloading..." : "Download Image"}
              </Button>
              <Button onClick={resetForm} variant="outline" size="icon">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Side - ID Card Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative">
                  {/* ID Card */}
                  <div
                    id="id-card-preview"
                    className={`w-80 h-[500px] rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                      template === 'modern' ? 'bg-gradient-to-br from-primary via-blue-600 to-purple-600' :
                      template === 'classic' ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                      'bg-white border-2 border-slate-200'
                    }`}>
                    {/* Header */}
                    <div className={`p-6 text-center ${template === 'minimal' ? 'text-slate-800' : 'text-white'}`}>
                      <div className="flex items-center justify-center mb-2">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-lg">{studentData.college || "University Name"}</h3>
                      <p className="text-sm opacity-90">Student Identification Card</p>
                    </div>

                    {/* Photo Section */}
                    <div className="px-6 mb-4">
                      <div className="w-24 h-24 mx-auto bg-white rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                        {studentData.photo ? (
                          <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className={`px-6 space-y-3 ${template === 'minimal' ? 'text-slate-800' : 'text-white'}`}>
                      <div>
                        <p className="text-xs opacity-70 uppercase tracking-wide">Name</p>
                        <p className="font-semibold">{studentData.name || "Student Name"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs opacity-70 uppercase tracking-wide">ID</p>
                          <p className="font-mono text-sm">{studentData.studentId || "ID000000"}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-70 uppercase tracking-wide">Course</p>
                          <p className="text-sm">{studentData.course || "Course Name"}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs opacity-70 uppercase tracking-wide">Email</p>
                        <p className="text-xs">{studentData.email || "email@university.edu"}</p>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="absolute bottom-6 right-6">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-slate-800" />
                      </div>
                    </div>

                    {/* Template Badge */}
                    <div className="absolute top-6 right-6">
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                        {template.charAt(0).toUpperCase() + template.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
