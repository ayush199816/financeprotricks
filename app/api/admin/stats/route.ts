import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface UserCount extends RowDataPacket {
  total_users: number;
}

interface PremiumUserCount extends RowDataPacket {
  premium_users: number;
}

export async function GET() {
  try {
    // Get total users count
    const [totalUsersResult] = await pool.query<UserCount[]>(
      'SELECT COUNT(*) as total_users FROM users WHERE role != "admin"'
    );

    // Get premium users count
    const [premiumUsersResult] = await pool.query<PremiumUserCount[]>(
      'SELECT COUNT(*) as premium_users FROM users WHERE role = "premium"'
    );

    return NextResponse.json({
      totalUsers: totalUsersResult[0].total_users,
      premiumUsers: premiumUsersResult[0].premium_users
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 