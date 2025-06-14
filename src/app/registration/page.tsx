"use client";

import type React from "react";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function RegistrationPage() {
  const searchParams = useSearchParams();
  const selectedCourse = searchParams.get("course");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: selectedCourse || "",
    experience: "",
    motivation: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const courses = [
    { id: "1", name: "Web Development Fundamentals" },
    { id: "2", name: "React.js Mastery" },
    { id: "3", name: "Full-Stack Development" },
    { id: "4", name: "UI/UX Design Principles" },
    { id: "5", name: "Data Science with Python" },
    { id: "6", name: "Digital Marketing Strategy" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Registration Successful!",
      description:
        "Thank you for registering. You will receive a confirmation email shortly.",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      experience: "",
      motivation: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='py-12'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Course Registration
          </h1>
          <p className='text-xl text-gray-600'>
            Take the first step towards advancing your career. Fill out the form
            below to register for your chosen course.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please provide accurate information. All fields marked with * are
              required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Personal Information */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>First Name *</Label>
                  <Input
                    id='firstName'
                    type='text'
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder='Enter your first name'
                  />
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name *</Label>
                  <Input
                    id='lastName'
                    type='text'
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder='Enter your last name'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='email'>Email Address *</Label>
                  <Input
                    id='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder='Enter your email address'
                  />
                </div>
                <div>
                  <Label htmlFor='phone'>Phone Number *</Label>
                  <Input
                    id='phone'
                    type='tel'
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder='Enter your phone number'
                  />
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <Label htmlFor='course'>Select Course *</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => handleInputChange("course", value)}
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder='Choose a course' />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div>
                <Label htmlFor='experience'>Experience Level *</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    handleInputChange("experience", value)
                  }
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your experience level' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='beginner'>Beginner</SelectItem>
                    <SelectItem value='intermediate'>Intermediate</SelectItem>
                    <SelectItem value='advanced'>Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Motivation */}
              <div>
                <Label htmlFor='motivation'>
                  Why do you want to take this course?
                </Label>
                <Textarea
                  id='motivation'
                  value={formData.motivation}
                  onChange={(e) =>
                    handleInputChange("motivation", e.target.value)
                  }
                  placeholder='Tell us about your goals and motivation...'
                  rows={4}
                />
              </div>

              {/* Agreements */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor='terms' className='text-sm'>
                    I agree to the{" "}
                    <a href='/terms' className='text-blue-600 hover:underline'>
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href='/privacy'
                      className='text-blue-600 hover:underline'>
                      Privacy Policy
                    </a>{" "}
                    *
                  </Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='marketing'
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToMarketing", checked as boolean)
                    }
                  />
                  <Label htmlFor='marketing' className='text-sm'>
                    I would like to receive updates about new courses and
                    educational content
                  </Label>
                </div>
              </div>

              <Button type='submit' className='w-full' size='lg'>
                Register for Course
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
          <h3 className='font-semibold text-blue-900 mb-2'>
            Data Security & Privacy
          </h3>
          <p className='text-sm text-blue-800'>
            Your personal information is protected with industry-standard
            security measures. We use HTTPS encryption for all data transmission
            and follow strict privacy policies. Your data will not be shared
            with third parties without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
}
