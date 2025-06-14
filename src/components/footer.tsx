import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <div className='flex items-center space-x-2 mb-4'>
              <GraduationCap className='h-8 w-8 text-blue-400' />
              <span className='text-xl font-bold'>EduCenter</span>
            </div>
            <p className='text-gray-300 mb-4'>
              Empowering learners with quality education and professional
              development courses. Join thousands of students who have
              transformed their careers with us.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/courses'
                  className='text-gray-300 hover:text-white'>
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href='/instructors'
                  className='text-gray-300 hover:text-white'>
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  href='/registration'
                  className='text-gray-300 hover:text-white'>
                  Registration
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-gray-300 hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Info</h3>
            <ul className='space-y-2'>
              <li className='flex items-center space-x-2'>
                <Phone className='h-4 w-4' />
                <span className='text-gray-300'>+1 (555) 123-4567</span>
              </li>
              <li className='flex items-center space-x-2'>
                <Mail className='h-4 w-4' />
                <span className='text-gray-300'>info@educenter.com</span>
              </li>
              <li className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4' />
                <span className='text-gray-300'>
                  123 Education St, Learning City
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center'>
          <p className='text-gray-300'>
            © 2024 Educational Center. All rights reserved. Built with React.js
            following industry best practices.
          </p>
        </div>
      </div>
    </footer>
  );
}
