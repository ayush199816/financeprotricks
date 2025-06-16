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

// Path to the JSON file that stores the courses
const DB_PATH = path.join(process.cwd(), 'data', 'courses.json');

// Helper function to read courses from the JSON file
async function getCourses(): Promise<Course[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses:', error);
    return [];
  }
}

// Helper function to write courses to the JSON file
async function saveCourses(courses: Course[]): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(courses, null, 2));
  } catch (error) {
    console.error('Error saving courses:', error);
    throw new Error('Failed to save courses');
  }
}

// GET handler - Get a specific course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courses = await getCourses();
    const id = parseInt(params.id);
    
    const course = courses.find(course => course.id === id);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error(`Error in GET course/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT handler - Update a specific course by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courses = await getCourses();
    const id = parseInt(params.id);
    const updatedCourse = await request.json();
    
    const index = courses.findIndex(course => course.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Validate required fields
    if (!updatedCourse.title || !updatedCourse.instructor) {
      return NextResponse.json(
        { error: 'Title and instructor are required' },
        { status: 400 }
      );
    }
    
    // Update the course while preserving the ID
    courses[index] = {
      ...updatedCourse,
      id,
    };
    
    await saveCourses(courses);
    
    return NextResponse.json(courses[index]);
  } catch (error) {
    console.error(`Error in PUT course/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a specific course by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courses = await getCourses();
    const id = parseInt(params.id);
    
    const index = courses.findIndex(course => course.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Remove the course
    courses.splice(index, 1);
    
    await saveCourses(courses);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE course/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
