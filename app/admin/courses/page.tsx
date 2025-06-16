"use client";

import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import CourseForm from './CourseForm';

// Define the Course type based on our featured_courses table
interface Course {
  id?: number;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  classes: number;
  students: number;
  img_src: string;
  best_seller: boolean;
}

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/admin/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Open modal for creating a new course
  const handleAddNew = () => {
    setCurrentCourse(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing course
  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  // Confirm deletion of a course
  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setIsDeleting(true);
  };

  // Delete a course
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/admin/courses/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      // Remove the deleted course from the state
      setCourses(courses.filter(course => course.id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Save a course (create or update)
  const handleSave = async (courseData: Course) => {
    try {
      const isEditing = !!courseData.id;
      const url = isEditing 
        ? `/api/admin/courses/${courseData.id}` 
        : '/api/admin/courses';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} course`);
      
      const savedCourse = await response.json();
      
      if (isEditing) {
        // Update the existing course in the state
        setCourses(courses.map(course => 
          course.id === savedCourse.id ? savedCourse : course
        ));
      } else {
        // Add the new course to the state
        setCourses([...courses, savedCourse]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  // Render star ratings
  const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-400">★</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-400">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Featured Courses</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-md hover:from-orange-600 hover:to-yellow-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Course
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <img 
                  src={course.img_src} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.best_seller && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    BESTSELLER
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                <p className="text-gray-400 mb-2">{course.instructor}</p>
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold mr-2 text-white">{course.rating}</span>
                  <RatingStars rating={course.rating} />
                </div>
                <div className="text-gray-300 mb-4">
                  <p>{course.classes} Classes • {course.students} Students</p>
                  <p className="font-bold text-lg">${course.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirm(course.id!)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {currentCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <CourseForm 
              course={currentCourse || undefined} 
              onSave={handleSave} 
              onCancel={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Confirm Deletion</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
