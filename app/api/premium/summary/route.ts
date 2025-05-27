import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface FinancialSummary extends RowDataPacket {
  total_balance: number;
  monthly_income: number;
  monthly_expenses: number;
  savings_rate: number;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get total balance
    const [balanceResult] = await pool.query<FinancialSummary[]>(
      'SELECT SUM(balance) as total_balance FROM accounts WHERE user_id = ?',
      [userId]
    );

    // Get monthly income and expenses
    const [monthlyResult] = await pool.query<FinancialSummary[]>(
      `SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as monthly_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as monthly_expenses
       FROM transactions 
       WHERE user_id = ? 
       AND created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`,
      [userId]
    );

    const summary = {
      total_balance: balanceResult[0].total_balance || 0,
      monthly_income: monthlyResult[0].monthly_income || 0,
      monthly_expenses: monthlyResult[0].monthly_expenses || 0,
      savings_rate: monthlyResult[0].monthly_income 
        ? ((monthlyResult[0].monthly_income - (monthlyResult[0].monthly_expenses || 0)) / monthlyResult[0].monthly_income) * 100 
        : 0
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch financial summary' },
      { status: 500 }
    );
  }
} 