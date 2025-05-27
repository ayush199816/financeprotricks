import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Budget extends RowDataPacket {
  id: number;
  category_name: string;
  amount: number;
  spent: number;
  period: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [budgets] = await pool.query<Budget[]>(
      `SELECT b.id, c.name as category_name, b.amount, 
              COALESCE(SUM(t.amount), 0) as spent, b.period
       FROM budgets b
       LEFT JOIN categories c ON b.category_id = c.id
       LEFT JOIN transactions t ON t.category_id = c.id 
         AND t.user_id = ? 
         AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       WHERE b.user_id = ?
       GROUP BY b.id, c.name, b.amount, b.period
       ORDER BY c.name ASC`,
      [(session.user as any).id, (session.user as any).id]
    );

    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
} 