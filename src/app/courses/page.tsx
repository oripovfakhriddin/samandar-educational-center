import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description:
        "Learn HTML, CSS, and JavaScript from scratch. Perfect for beginners who want to start their web development journey.",
      duration: "12 weeks",
      students: 1250,
      rating: 4.8,
      price: "$299",
      level: "Beginner",
      instructor: "John Smith",
    },
    {
      id: 2,
      title: "React.js Mastery",
      description:
        "Master React.js and build modern web applications. Includes hooks, context, and advanced patterns.",
      duration: "10 weeks",
      students: 890,
      rating: 4.9,
      price: "$399",
      level: "Intermediate",
      instructor: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Full-Stack Development",
      description:
        "Complete full-stack development course covering frontend, backend, and database technologies.",
      duration: "16 weeks",
      students: 650,
      rating: 4.7,
      price: "$599",
      level: "Advanced",
      instructor: "Mike Chen",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description:
        "Learn design thinking, user research, prototyping, and create beautiful user interfaces.",
      duration: "8 weeks",
      students: 420,
      rating: 4.6,
      price: "$249",
      level: "Beginner",
      instructor: "Emily Davis",
    },
    {
      id: 5,
      title: "Data Science with Python",
      description:
        "Comprehensive data science course covering Python, pandas, numpy, and machine learning basics.",
      duration: "14 weeks",
      students: 780,
      rating: 4.8,
      price: "$499",
      level: "Intermediate",
      instructor: "David Wilson",
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      description:
        "Learn modern digital marketing techniques, SEO, social media marketing, and analytics.",
      duration: "6 weeks",
      students: 950,
      rating: 4.5,
      price: "$199",
      level: "Beginner",
      instructor: "Lisa Anderson",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Our Courses</h1>
          <p className='text-xl text-gray-600'>
            Discover our comprehensive range of professional courses designed to
            advance your career
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {courses.map((course) => (
            <Card key={course.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex justify-between items-start mb-2'>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm text-gray-600'>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <CardTitle className='text-xl'>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className='space-y-2 text-sm text-gray-600'>
                  <div className='flex items-center space-x-2'>
                    <Clock className='h-4 w-4' />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Users className='h-4 w-4' />
                    <span>{course.students} students enrolled</span>
                  </div>
                  <div>
                    <span className='font-medium'>Instructor: </span>
                    {course.instructor}
                  </div>
                </div>
              </CardContent>

              <CardFooter className='flex justify-between items-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {course.price}
                </div>
                <Button asChild>
                  <Link href={`/registration?course=${course.id}`}>
                    Enroll Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
