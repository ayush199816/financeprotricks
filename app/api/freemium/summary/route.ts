import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface BalanceSummary extends RowDataPacket {
  total_balance: number;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [summary] = await pool.query<BalanceSummary[]>(`
      SELECT COALESCE(SUM(balance), 0) as total_balance 
      FROM accounts 
      WHERE user_id = ?
    `, [session.user.id]);

    return NextResponse.json({
      totalBalance: summary[0].total_balance
    });
  } catch (error) {
    console.error('Error fetching freemium summary:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 