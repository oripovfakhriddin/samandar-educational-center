import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Award, Clock } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Quality Courses",
      description: "Comprehensive curriculum designed by industry experts",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced professionals in their fields",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn recognized certificates upon course completion",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Study at your own pace with flexible timing options",
    },
  ];

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Transform Your Future with Quality Education
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100'>
              Join thousands of students who have advanced their careers through
              our professional courses
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                asChild
                className='bg-white text-blue-600 hover:bg-gray-100'>
                <Link href='/courses'>Explore Courses</Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                asChild
                className='border-white text-white hover:bg-white hover:text-blue-600'>
                <Link href='/registration'>Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose Our Educational Center?
            </h2>
            <p className='text-xl text-gray-600'>
              We provide comprehensive learning experiences designed for your
              success
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <feature.icon className='h-12 w-12 text-blue-600 mx-auto mb-4' />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-20 bg-blue-600 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div>
              <div className='text-4xl md:text-5xl font-bold mb-2'>5000+</div>
              <div className='text-xl text-blue-100'>Students Enrolled</div>
            </div>
            <div>
              <div className='text-4xl md:text-5xl font-bold mb-2'>50+</div>
              <div className='text-xl text-blue-100'>Expert Instructors</div>
            </div>
            <div>
              <div className='text-4xl md:text-5xl font-bold mb-2'>100+</div>
              <div className='text-xl text-blue-100'>Courses Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Ready to Start Your Learning Journey?
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Join our community of learners and take the first step towards your
            goals
          </p>
          <Button size='lg' asChild>
            <Link href='/registration'>Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
