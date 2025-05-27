import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ActivityLog extends RowDataPacket {
  username: string;
  activity_type: string;
  description: string;
  created_at: string;
}

export async function GET() {
  try {
    const [activities] = await pool.query<ActivityLog[]>(`
      SELECT u.username, l.activity_type, l.description, l.created_at 
      FROM user_activity_logs l 
      JOIN users u ON l.user_id = u.user_id 
      ORDER BY l.created_at DESC 
      LIMIT 10
    `);

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching admin activities:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 