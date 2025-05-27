import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ComponentSetting extends RowDataPacket {
  id: number;
  component_name: string;
  is_enabled: boolean;
  display_order: number;
  settings: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [settings] = await pool.query<ComponentSetting[]>(
      'SELECT * FROM component_settings ORDER BY display_order ASC'
    );

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching component settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch component settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { componentName, isEnabled, displayOrder, settings } = await request.json();

    await pool.query(
      `UPDATE component_settings 
       SET is_enabled = ?, display_order = ?, settings = ?
       WHERE component_name = ?`,
      [isEnabled, displayOrder, JSON.stringify(settings), componentName]
    );

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating component settings:', error);
    return NextResponse.json(
      { error: 'Failed to update component settings' },
      { status: 500 }
    );
  }
} 