"use client";

import { useState, useEffect } from 'react';
import SubscriptionPlanForm, { SubscriptionPlanType } from './SubscriptionPlanForm';

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlanType | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  // Fetch subscription plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Function to fetch subscription plans
  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/subscription-plans');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription plans');
      }
      
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      console.error('Error fetching subscription plans:', err);
      setError('Failed to load subscription plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new subscription plan
  const addPlan = async (plan: SubscriptionPlanType) => {
    try {
      const response = await fetch('/api/admin/subscription-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add subscription plan');
      }
      
      await fetchPlans();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding subscription plan:', err);
      setError('Failed to add subscription plan. Please try again.');
    }
  };

  // Function to update an existing subscription plan
  const updatePlan = async (plan: SubscriptionPlanType) => {
    if (!plan.id) return;
    
    try {
      const response = await fetch(`/api/admin/subscription-plans/${plan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update subscription plan');
      }
      
      await fetchPlans();
      setIsModalOpen(false);
      setCurrentPlan(undefined);
    } catch (err) {
      console.error('Error updating subscription plan:', err);
      setError('Failed to update subscription plan. Please try again.');
    }
  };

  // Function to delete a subscription plan
  const deletePlan = async (id: string) => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/subscription-plans/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete subscription plan');
      }
      
      await fetchPlans();
    } catch (err) {
      console.error('Error deleting subscription plan:', err);
      setError('Failed to delete subscription plan. Please try again.');
    } finally {
      setIsDeleting(false);
      setPlanToDelete(null);
    }
  };

  // Handle form submission
  const handleSubmit = (plan: SubscriptionPlanType) => {
    if (plan.id) {
      updatePlan(plan);
    } else {
      addPlan(plan);
    }
  };

  // Open modal for adding a new plan
  const handleAddClick = () => {
    setCurrentPlan(undefined);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing plan
  const handleEditClick = (plan: SubscriptionPlanType) => {
    setCurrentPlan(plan);
    setIsModalOpen(true);
  };

  // Confirm deletion of a plan
  const handleDeleteClick = (id: string) => {
    setPlanToDelete(id);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setPlanToDelete(null);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (planToDelete) {
      deletePlan(planToDelete);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPlan(undefined);
  };

  // Determine the category color for display
  const getCategoryColor = (category: string) => {
    return category === 'yearly' ? 'bg-blue-600' : 'bg-green-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          Subscription Plans
        </h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Add New Plan
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {plan.heading}
                  </h2>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getCategoryColor(plan.category)}`}>
                    {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">{plan.user}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-gray-300"><span className="font-semibold">Profiles:</span> {plan.profiles}</p>
                  <p className="text-gray-300"><span className="font-semibold">Posts:</span> {plan.posts}</p>
                  <p className="text-gray-300"><span className="font-semibold">Templates:</span> {plan.templates}</p>
                  <p className="text-gray-300"><span className="font-semibold">View:</span> {plan.view}</p>
                  <p className="text-gray-300"><span className="font-semibold">Support:</span> {plan.support}</p>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(plan)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(plan.id!)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {currentPlan ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
            </h2>
            <SubscriptionPlanForm
              plan={currentPlan}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {planToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Confirm Deletion
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this subscription plan? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
