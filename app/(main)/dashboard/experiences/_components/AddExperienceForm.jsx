"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/app/provider";
import { FileCheck2, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/services/supabaseClient";

function AddExperienceForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
     unique_id: "",
      name: "",
      email: "",
      company: "",
      jobRole: "",
      difficulty: "",
      questions: "",
      tips: "",
      selected: ""
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);




  useEffect(() => {
  const checkConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('Experiences')
        .select('id')
        .limit(1);
      
      if (error) {
        console.warn('Supabase connection issue:', error);
      } else {
        console.log('Supabase connection successful');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
    }
  };

  checkConnection();
}, []);


  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const id = uuidv4();
    if (user) {
      onHandleInputChange("unique_id", id);
      onHandleInputChange("name", user?.name);
      onHandleInputChange("email", user?.email);
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      company: "",
      "jobRole": "",
      difficulty: "",
      questions: "",
      tips: "",
      selected: ""
    });
  };

  const onSaveData = async () => {
  if (loading) return;

  // Validation
  if (!formData.company?.trim()) return toast.error("Please enter company name!");
  if (!formData.jobRole?.trim()) return toast.error("Please enter Job Role!");
  if (!formData.difficulty?.trim()) return toast.error("Please enter difficulty level!");
  if (!formData.questions?.trim()) return toast.error("Please enter questions asked!");
  if (!formData.tips?.trim()) return toast.error("Please enter tips!");
  if (!formData.selected?.trim()) return toast.error("Please enter selection status!");

  setLoading(true);

  try {
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('Experiences')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Connection test failed:', testError);
      throw new Error(`Database connection failed: ${testError.message}`);
    }

    // Prepare the data
    const insertData = {
      unique_id: formData.unique_id,
      name: formData.name,  
      email: formData.email,
      company: formData.company,
      "jobRole": formData.jobRole,
      difficulty: formData.difficulty,
      questions: formData.questions,
      tips: formData.tips,
      selected: formData.selected,
    };

    console.log("Inserting data:", insertData);

    const { data, error } = await supabase
      .from("Experiences")
      .insert([insertData])
      .select();

    if (error) {
      console.error('Insert error details:', error);
      throw error;
    }

    console.log("Successfully inserted:", data);
    toast.success("🎉 Experience saved successfully!");
    
    resetForm();
    setOpen(false);
    
  } catch (error) {
    console.error("Insert error:", error);
    
    // Handle specific error types
    if (error.message?.includes('Failed to fetch') || error.message?.includes('connection')) {
      toast.error("❌ Network error: Cannot connect to database. Please check your internet connection.");
    } else {
      toast.error(`❌ Error: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl mt-3 shadow-sm border border-blue-200">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            + Add Experience
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Share Your Interview Experience
            </DialogTitle>

            <DialogDescription asChild>
              <div className="space-y-4 mt-3">
                
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input readOnly value={user?.name} className="bg-gray-100" />
                </div>

                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input readOnly value={user?.email} className="bg-gray-100" />
                </div>

                <div className="space-y-1">
                  <Label>Company</Label>
                  <Input
                    placeholder="e.g. Google"
                    value={formData.company}
                    onChange={(e) => onHandleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Role</Label>
                  <Input
                    placeholder="e.g. Software Engineer Intern"
                    value={formData.jobRole}
                    onChange={(e) => onHandleInputChange("jobRole", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Difficulty</Label>
                    <Select 
                      value={formData.difficulty}
                      onValueChange={(value) => onHandleInputChange("difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Selected</Label>
                    <Select 
                      value={formData.selected}
                      onValueChange={(value) => onHandleInputChange("selected", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selected or not" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selected">Selected</SelectItem>
                        <SelectItem value="not selected">Not Selected</SelectItem>
                        <SelectItem value="ghosted">Ghosted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Questions Asked</Label>
                  <Textarea
                    rows={3}
                    placeholder="e.g. Explain Interview Rounds , Questions asked, Important Concepts ... "
                    value={formData.questions}
                    onChange={(e) => onHandleInputChange("questions", e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Tips</Label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Focus on problem-solving + communication."
                    value={formData.tips}
                    onChange={(e) => onHandleInputChange("tips", e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex gap-2" 
                  onClick={onSaveData} 
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" size={18}/> : <FileCheck2 size={18} />}
                  {loading ? "Saving.. " : "Save Experience"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddExperienceForm;