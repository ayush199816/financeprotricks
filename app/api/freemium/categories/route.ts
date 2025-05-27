import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Category extends RowDataPacket {
  id: number;
  name: string;
  type: string;
  icon: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [categories] = await pool.query<Category[]>(
      `SELECT id, name, type, icon
       FROM categories
       WHERE is_default = true OR user_id = ?
       ORDER BY name ASC`,
      [(session.user as any).id]
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 