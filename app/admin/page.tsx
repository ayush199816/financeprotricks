'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
}

interface ActivityLog {
  username: string;
  activityType: string;
  description: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, premiumUsers: 0 });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, activitiesRes] = await Promise.all([
          axios.get<DashboardStats>('/api/admin/stats'),
          axios.get<ActivityLog[]>('/api/admin/activities')
        ]);
        setStats(statsRes.data);
        setActivities(activitiesRes.data);
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
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center admin-lava-bg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
           {/* Admin Dollar Sign Animation */}
           <div className="admin-dollar-animation">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`admin-dollar-sign dollar-${i}`}>$</div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 admin-lava-bg">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="overflow-hidden shadow rounded-lg lava-box">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium truncate lava-text-gradient">
              Total Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold lava-text-gradient">
              {stats.totalUsers}
            </dd>
          </div>
        </div>
        <div className="overflow-hidden shadow rounded-lg lava-box">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium truncate lava-text-gradient">
              Premium Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold lava-text-gradient">
              {stats.premiumUsers}
            </dd>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="shadow rounded-lg lava-box">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium lava-text-gradient">
            Recent Activities
          </h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-700">
                {activities.map((activity, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {activity.username}
                        </p>
                        <p className="text-sm text-gray-300">
                          {activity.activityType} - {activity.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-300">
                        {new Date(activity.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 