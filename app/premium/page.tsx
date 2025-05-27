'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Transaction {
  id: string;
  description: string;
  categoryName: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
}

interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface Budget {
  id: string;
  categoryName: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
}

export default function PremiumDashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState<FinancialSummary>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          summaryRes,
          transactionsRes,
          categoriesRes,
          goalsRes,
          budgetsRes
        ] = await Promise.all([
          axios.get<FinancialSummary>('/api/premium/summary'),
          axios.get<Transaction[]>('/api/premium/transactions'),
          axios.get<Category[]>('/api/premium/categories'),
          axios.get<Goal[]>('/api/premium/goals'),
          axios.get<Budget[]>('/api/premium/budgets')
        ]);
        setSummary(summaryRes.data);
        setTransactions(transactionsRes.data);
        setCategories(categoriesRes.data);
        setGoals(goalsRes.data);
        setBudgets(budgetsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Finance Pro Tricks</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/logout')}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Balance
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                ${summary.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Monthly Income
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                ${summary.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Monthly Expenses
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">
                ${summary.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Savings Rate
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {summary.savingsRate}%
              </dd>
            </div>
          </div>
        </div>

        {/* Goals and Budgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Financial Goals */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Financial Goals
              </h3>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <span className={`text-sm ${
                        goal.status === 'completed' ? 'text-green-600' :
                        goal.status === 'cancelled' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budgets */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Budgets
              </h3>
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <div key={budget.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{budget.categoryName}</h4>
                      <span className="text-sm text-gray-500">
                        ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          budget.spent > budget.amount ? 'bg-red-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Transactions
            </h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.categoryName}
                        </p>
                      </div>
                      <div className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 