import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Goal extends RowDataPacket {
  id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  status: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [goals] = await pool.query<Goal[]>(
      `SELECT id, name, target_amount, current_amount, target_date, status
       FROM goals
       WHERE user_id = ?
       ORDER BY target_date ASC`,
      [(session.user as any).id]
    );

    return NextResponse.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
} 