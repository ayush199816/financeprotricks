import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the Course type
interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  classes: number;
  students: number;
  img_src: string;
  best_seller: boolean;
}

// This is a mock database implementation
// In a real application, you would use a proper database
const DB_PATH = path.join(process.cwd(), 'data', 'courses.json');

// Helper function to ensure the data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Helper function to read courses from the JSON file
async function getCourses(): Promise<Course[]> {
  try {
    await ensureDataDir();
    
    try {
      const data = await fs.readFile(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is invalid, return initial data
      const initialData = [
        {
          id: 1,
          title: 'Financial Planning Fundamentals',
          instructor: 'Robert Morgan',
          rating: 4.4,
          price: 20,
          classes: 12,
          students: 150,
          img_src: '/images/featured/feat1.jpg',
          best_seller: true,
        },
        {
          id: 2,
          title: 'Investment Strategies for Beginners',
          instructor: 'Sarah Johnson',
          rating: 4.5,
          price: 20,
          classes: 12,
          students: 130,
          best_seller: true,
          img_src: '/images/featured/feat2.jpg',
        },
        {
          id: 3,
          title: 'Retirement Planning Masterclass',
          instructor: 'Michael Chen',
          rating: 5,
          price: 20,
          classes: 12,
          students: 120,
          best_seller: true,
          img_src: '/images/featured/feat1.jpg',
        },
        {
          id: 4,
          title: 'Tax Optimization Strategies',
          instructor: 'Emily Rodriguez',
          rating: 4.3,
          price: 20,
          classes: 10,
          students: 95,
          best_seller: false,
          img_src: '/images/featured/feat2.jpg',
        },
        {
          id: 5,
          title: 'Stock Market Analysis',
          instructor: 'David Williams',
          rating: 4.7,
          price: 20,
          classes: 14,
          students: 165,
          best_seller: true,
          img_src: '/images/featured/feat1.jpg',
        },
        {
          id: 6,
          title: 'Real Estate Investment',
          instructor: 'Jennifer Lee',
          rating: 4.6,
          price: 20,
          classes: 12,
          students: 110,
          best_seller: false,
          img_src: '/images/featured/feat2.jpg',
        }
      ];
      
      // Save the initial data
      await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
  } catch (error) {
    console.error('Error reading courses:', error);
    return [];
  }
}

// Helper function to write courses to the JSON file
async function saveCourses(courses: Course[]): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(DB_PATH, JSON.stringify(courses, null, 2));
  } catch (error) {
    console.error('Error saving courses:', error);
    throw new Error('Failed to save courses');
  }
}

// GET handler - Get all courses
export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error in GET courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new course
export async function POST(request: NextRequest) {
  try {
    const courses = await getCourses();
    const newCourse = await request.json();
    
    // Validate required fields
    if (!newCourse.title || !newCourse.instructor) {
      return NextResponse.json(
        { error: 'Title and instructor are required' },
        { status: 400 }
      );
    }
    
    // Generate a new ID
    const newId = courses.length > 0 
      ? Math.max(...courses.map(course => course.id)) + 1 
      : 1;
    
    const courseToAdd = {
      ...newCourse,
      id: newId,
    };
    
    courses.push(courseToAdd);
    await saveCourses(courses);
    
    return NextResponse.json(courseToAdd, { status: 201 });
  } catch (error) {
    console.error('Error in POST course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
