"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  Eye,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Mock data
  const stats = {
    totalStudents: 5000,
    totalCourses: 25,
    totalInstructors: 15,
    activeRegistrations: 150,
  };

  const recentRegistrations = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "React.js Mastery",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Web Development",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Data Science",
      date: "2024-01-13",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (loginData.username === "admin" && loginData.password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use admin/admin123 for demo.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center'>Admin Login</CardTitle>
            <CardDescription className='text-center'>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className='space-y-4'>
              <div>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder='Enter username'
                  required
                />
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder='Enter password'
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
              <p className='text-sm text-gray-600 text-center'>
                Demo credentials: admin / admin123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
          <Button variant='outline' onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Students
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stats.totalStudents.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Courses
              </CardTitle>
              <BookOpen className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.totalCourses}</div>
              <p className='text-xs text-muted-foreground'>+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Instructors</CardTitle>
              <GraduationCap className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.totalInstructors}</div>
              <p className='text-xs text-muted-foreground'>+1 new instructor</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Registrations
              </CardTitle>
              <Settings className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stats.activeRegistrations}
              </div>
              <p className='text-xs text-muted-foreground'>This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue='registrations' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='registrations'>
              Recent Registrations
            </TabsTrigger>
            <TabsTrigger value='courses'>Manage Courses</TabsTrigger>
            <TabsTrigger value='instructors'>Manage Instructors</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>

          <TabsContent value='registrations'>
            <Card>
              <CardHeader>
                <CardTitle>Recent Student Registrations</CardTitle>
                <CardDescription>
                  Latest course registrations from students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {recentRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className='flex items-center justify-between p-4 border rounded-lg'>
                      <div>
                        <h4 className='font-semibold'>{registration.name}</h4>
                        <p className='text-sm text-gray-600'>
                          {registration.email}
                        </p>
                        <Badge variant='secondary' className='mt-1'>
                          {registration.course}
                        </Badge>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-gray-500'>
                          {registration.date}
                        </p>
                        <div className='flex space-x-2 mt-2'>
                          <Button size='sm' variant='outline'>
                            <Eye className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Edit className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='courses'>
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove courses from the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <Button>Add New Course</Button>
                  <p className='text-gray-600'>
                    Course management interface would be implemented here with
                    full CRUD operations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='instructors'>
            <Card>
              <CardHeader>
                <CardTitle>Instructor Management</CardTitle>
                <CardDescription>
                  Manage instructor profiles and assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <Button>Add New Instructor</Button>
                  <p className='text-gray-600'>
                    Instructor management interface would be implemented here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='settings'>
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <p className='text-gray-600'>
                    System configuration options would be available here,
                    including:
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-600'>
                    <li>Email notification settings</li>
                    <li>Payment gateway configuration</li>
                    <li>Security settings</li>
                    <li>Backup and maintenance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
