"use client";

import { useState, useEffect } from 'react';

// Define the subscription plan type
export type SubscriptionPlanType = {
  id?: string;
  heading: string;
  price: number;
  user: string;
  button: string;
  profiles: string;
  posts: string;
  templates: string;
  view: string;
  support: string;
  category: string;
};

// Default empty plan for new entries
const emptyPlan: SubscriptionPlanType = {
  heading: '',
  price: 0,
  user: '',
  button: '',
  profiles: '',
  posts: '',
  templates: '',
  view: '',
  support: '',
  category: 'monthly'
};

type SubscriptionPlanFormProps = {
  plan?: SubscriptionPlanType;
  onSubmit: (plan: SubscriptionPlanType) => void;
  onCancel: () => void;
};

export default function SubscriptionPlanForm({ 
  plan, 
  onSubmit, 
  onCancel 
}: SubscriptionPlanFormProps) {
  // Initialize form state with either the provided plan or an empty plan
  const [formData, setFormData] = useState<SubscriptionPlanType>(plan || emptyPlan);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when the plan prop changes
  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle price as a number
    if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field when it's being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.heading) newErrors.heading = 'Heading is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.user) newErrors.user = 'User type is required';
    if (!formData.button) newErrors.button = 'Button text is required';
    if (!formData.profiles) newErrors.profiles = 'Profiles is required';
    if (!formData.posts) newErrors.posts = 'Posts is required';
    if (!formData.templates) newErrors.templates = 'Templates is required';
    if (!formData.view) newErrors.view = 'View is required';
    if (!formData.support) newErrors.support = 'Support is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    // Price validation
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heading */}
        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-300 mb-1">
            Heading
          </label>
          <input
            id="heading"
            name="heading"
            type="text"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.heading && <p className="text-red-500 text-xs mt-1">{errors.heading}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* User */}
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-300 mb-1">
            User Type
          </label>
          <input
            id="user"
            name="user"
            type="text"
            value={formData.user}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.user && <p className="text-red-500 text-xs mt-1">{errors.user}</p>}
        </div>

        {/* Button */}
        <div>
          <label htmlFor="button" className="block text-sm font-medium text-gray-300 mb-1">
            Button Text
          </label>
          <input
            id="button"
            name="button"
            type="text"
            value={formData.button}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.button && <p className="text-red-500 text-xs mt-1">{errors.button}</p>}
        </div>

        {/* Profiles */}
        <div>
          <label htmlFor="profiles" className="block text-sm font-medium text-gray-300 mb-1">
            Profiles
          </label>
          <input
            id="profiles"
            name="profiles"
            type="text"
            value={formData.profiles}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.profiles && <p className="text-red-500 text-xs mt-1">{errors.profiles}</p>}
        </div>

        {/* Posts */}
        <div>
          <label htmlFor="posts" className="block text-sm font-medium text-gray-300 mb-1">
            Posts
          </label>
          <input
            id="posts"
            name="posts"
            type="text"
            value={formData.posts}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.posts && <p className="text-red-500 text-xs mt-1">{errors.posts}</p>}
        </div>

        {/* Templates */}
        <div>
          <label htmlFor="templates" className="block text-sm font-medium text-gray-300 mb-1">
            Templates
          </label>
          <input
            id="templates"
            name="templates"
            type="text"
            value={formData.templates}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.templates && <p className="text-red-500 text-xs mt-1">{errors.templates}</p>}
        </div>

        {/* View */}
        <div>
          <label htmlFor="view" className="block text-sm font-medium text-gray-300 mb-1">
            View
          </label>
          <input
            id="view"
            name="view"
            type="text"
            value={formData.view}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.view && <p className="text-red-500 text-xs mt-1">{errors.view}</p>}
        </div>

        {/* Support */}
        <div>
          <label htmlFor="support" className="block text-sm font-medium text-gray-300 mb-1">
            Support
          </label>
          <input
            id="support"
            name="support"
            type="text"
            value={formData.support}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.support && <p className="text-red-500 text-xs mt-1">{errors.support}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {plan ? 'Update Plan' : 'Add Plan'}
        </button>
      </div>
    </form>
  );
}
