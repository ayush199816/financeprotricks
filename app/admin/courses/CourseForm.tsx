"use client";

import React, { useState } from 'react';

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

interface CourseFormProps {
  course?: Course;
  onSave: (course: Course) => void;
  onCancel: () => void;
}

const defaultCourse: Course = {
  title: '',
  instructor: '',
  rating: 4.0,
  price: 20.00,
  classes: 10,
  students: 0,
  img_src: '/images/featured/feat1.jpg',
  best_seller: false,
};

export default function CourseForm({ course, onSave, onCancel }: CourseFormProps) {
  const [formData, setFormData] = useState<Course>(course || defaultCourse);
  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    let parsedValue: string | number | boolean = value;
    
    // Handle different input types
    if (type === 'number') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    } else if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
    
    // Clear error for this field if it exists
    if (errors[name as keyof Course]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Course, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
    }
    
    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    
    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }
    
    if (formData.classes < 0) {
      newErrors.classes = 'Number of classes cannot be negative';
    }
    
    if (formData.students < 0) {
      newErrors.students = 'Number of students cannot be negative';
    }
    
    if (!formData.img_src.trim()) {
      newErrors.img_src = 'Image path is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.title ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Instructor */}
        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-300 mb-1">
            Instructor
          </label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.instructor ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
            Rating (0-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.rating ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.price ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Classes */}
        <div>
          <label htmlFor="classes" className="block text-sm font-medium text-gray-300 mb-1">
            Number of Classes
          </label>
          <input
            type="number"
            id="classes"
            name="classes"
            min="0"
            value={formData.classes}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.classes ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.classes && <p className="text-red-500 text-sm mt-1">{errors.classes}</p>}
        </div>

        {/* Students */}
        <div>
          <label htmlFor="students" className="block text-sm font-medium text-gray-300 mb-1">
            Number of Students
          </label>
          <input
            type="number"
            id="students"
            name="students"
            min="0"
            value={formData.students}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.students ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.students && <p className="text-red-500 text-sm mt-1">{errors.students}</p>}
        </div>

        {/* Image Path */}
        <div>
          <label htmlFor="img_src" className="block text-sm font-medium text-gray-300 mb-1">
            Image Path
          </label>
          <input
            type="text"
            id="img_src"
            name="img_src"
            value={formData.img_src}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${
              errors.img_src ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.img_src && <p className="text-red-500 text-sm mt-1">{errors.img_src}</p>}
          <p className="text-gray-400 text-xs mt-1">Example: /images/featured/feat1.jpg</p>
        </div>

        {/* Best Seller */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="best_seller"
            name="best_seller"
            checked={formData.best_seller}
            onChange={handleChange}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
          />
          <label htmlFor="best_seller" className="ml-2 block text-sm text-gray-300">
            Mark as Bestseller
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded hover:from-orange-600 hover:to-yellow-600"
        >
          {course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}
