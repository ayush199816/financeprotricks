import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { writeFile } from 'fs/promises';
import path from 'path';

const VALID_COMPONENTS = [
  'articles',
  'banners',
  'beliefs',
  'digital_services',
  'faqs',
  'featured_courses',
  'testimonials'
];

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type } = params;
    if (!VALID_COMPONENTS.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid component type' },
        { status: 400 }
      );
    }

    let query = `SELECT * FROM ${type}`;
    if (type !== 'articles') {
        query += ' ORDER BY display_order ASC';
    }

    const [items] = await pool.query<RowDataPacket[]>(
      query
    );

    return NextResponse.json(items);
  } catch (error) {
    console.error(`Error fetching ${params.type}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${params.type}` },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type } = params;
    if (!VALID_COMPONENTS.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid component type' },
        { status: 400 }
      );
    }

    if (type === 'articles') {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const image = formData.get('image') as File | null;

        let imageUrl = null;
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const filename = `article-${uniqueSuffix}${path.extname(image.name)}`;
            const uploadDir = path.join(process.cwd(), 'public', 'images', 'articles');
            // Ensure upload directory exists (optional, but good practice)
            // await fs.mkdir(uploadDir, { recursive: true });
            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);
            imageUrl = `/images/articles/${filename}`;
        }

        const [result] = await pool.query(
            'INSERT INTO articles (title, content, image_url, author) VALUES (?, ?, ?, ?)',
            [title, content, imageUrl, author]
        );

        return NextResponse.json({ id: (result as any).insertId });

    } else {
        const data = await request.json();
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const [result] = await pool.query(
          `INSERT INTO ${type} (${columns}) VALUES (${placeholders})`,
          values
        );

        return NextResponse.json({ id: (result as any).insertId });
    }


  } catch (error) {
    console.error(`Error creating ${params.type}:`, error);
    return NextResponse.json(
      { error: `Failed to create ${params.type}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type } = params;
    if (!VALID_COMPONENTS.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid component type' },
        { status: 400 }
      );
    }

    const { id, ...data } = await request.json();
    const updates = Object.entries(data)
      .map(([key]) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), id];

    await pool.query(
      `UPDATE ${type} SET ${updates} WHERE id = ?`,
      values
    );

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(`Error updating ${params.type}:`, error);
    return NextResponse.json(
      { error: `Failed to update ${params.type}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type } = params;
    if (!VALID_COMPONENTS.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid component type' },
        { status: 400 }
      );
    }

    const { id } = await request.json();
    await pool.query(`DELETE FROM ${type} WHERE id = ?`, [id]);

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${params.type}:`, error);
    return NextResponse.json(
      { error: `Failed to delete ${params.type}` },
      { status: 500 }
    );
  }
} 