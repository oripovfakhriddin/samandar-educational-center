import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export default function InstructorsPage() {
  const instructors = [
    {
      id: 1,
      name: "John Smith",
      title: "Senior Web Developer",
      bio: "John has over 8 years of experience in web development and has worked with major tech companies. He specializes in JavaScript, React, and Node.js.",
      expertise: ["JavaScript", "React.js", "Node.js", "HTML/CSS"],
      rating: 4.9,
      students: 2500,
      courses: 3,
      location: "San Francisco, CA",
      experience: "8+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "React.js Expert",
      bio: "Sarah is a passionate frontend developer with expertise in React ecosystem. She has contributed to several open-source projects and loves teaching.",
      expertise: ["React.js", "TypeScript", "Redux", "Next.js"],
      rating: 4.8,
      students: 1800,
      courses: 2,
      location: "New York, NY",
      experience: "6+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Mike Chen",
      title: "Full-Stack Architect",
      bio: "Mike is a full-stack developer with extensive experience in building scalable web applications. He has led development teams in multiple startups.",
      expertise: ["Python", "Django", "React.js", "PostgreSQL", "AWS"],
      rating: 4.7,
      students: 1200,
      courses: 4,
      location: "Seattle, WA",
      experience: "10+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "UI/UX Design Lead",
      bio: "Emily is a creative designer with a strong background in user experience design. She has worked with Fortune 500 companies to improve their digital products.",
      expertise: [
        "Figma",
        "Adobe Creative Suite",
        "User Research",
        "Prototyping",
      ],
      rating: 4.6,
      students: 950,
      courses: 2,
      location: "Los Angeles, CA",
      experience: "7+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Data Science Specialist",
      bio: "David is a data scientist with a PhD in Statistics. He has helped numerous companies leverage data for business insights and machine learning solutions.",
      expertise: ["Python", "Machine Learning", "Pandas", "TensorFlow", "SQL"],
      rating: 4.8,
      students: 1400,
      courses: 3,
      location: "Boston, MA",
      experience: "9+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      title: "Digital Marketing Strategist",
      bio: "Lisa is a digital marketing expert who has helped businesses grow their online presence. She specializes in SEO, content marketing, and social media strategy.",
      expertise: [
        "SEO",
        "Content Marketing",
        "Google Analytics",
        "Social Media",
      ],
      rating: 4.5,
      students: 2200,
      courses: 2,
      location: "Chicago, IL",
      experience: "5+ years",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <div className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Our Expert Instructors
          </h1>
          <p className='text-xl text-gray-600'>
            Learn from industry professionals with years of real-world
            experience
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {instructors.map((instructor) => (
            <Card
              key={instructor.id}
              className='hover:shadow-lg transition-shadow'>
              <CardHeader className='text-center'>
                <div className='w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200'>
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <CardTitle className='text-xl'>{instructor.name}</CardTitle>
                <CardDescription className='text-blue-600 font-medium'>
                  {instructor.title}
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-4'>
                <p className='text-gray-600 text-sm'>{instructor.bio}</p>

                <div className='flex flex-wrap gap-2'>
                  {instructor.expertise.map((skill, index) => (
                    <Badge key={index} variant='secondary' className='text-xs'>
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span>{instructor.rating} rating</span>
                  </div>
                  <div>
                    <span className='font-medium'>{instructor.students}</span>{" "}
                    students
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Calendar className='h-4 w-4 text-gray-400' />
                    <span>{instructor.experience}</span>
                  </div>
                  <div>
                    <span className='font-medium'>{instructor.courses}</span>{" "}
                    courses
                  </div>
                </div>

                <div className='flex items-center space-x-1 text-sm text-gray-500'>
                  <MapPin className='h-4 w-4' />
                  <span>{instructor.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
