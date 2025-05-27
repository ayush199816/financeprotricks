import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Transaction extends RowDataPacket {
  id: number;
  amount: number;
  type: string;
  description: string;
  category_name: string;
  created_at: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [transactions] = await pool.query<Transaction[]>(
      `SELECT t.id, t.amount, t.type, t.description, c.name as category_name, t.created_at
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC
       LIMIT 10`,
      [(session.user as any).id]
    );

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
} 