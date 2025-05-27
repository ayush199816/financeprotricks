import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
// Attempt to import auth from next-auth/react or next-auth
// depending on which one is more likely to work in an App Router API route
// const { auth } = require('next-auth/react'); // This is usually for client components
// const { auth } = require('next-auth'); // This is often used in App Router server components/API routes

// Let's stick with getServerSession but ensure authOptions is correctly passed.
// The current code already passes authOptions, so the issue might be elsewhere.

export async function POST(req: Request) {
  try {
    console.log('Attempting to create article...');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    console.log('User:', session?.user);
    console.log('Role:', (session?.user as any)?.role);

    if (!session?.user || (session.user as any).role !== 'admin') {
      console.warn('Unauthorized attempt to create article. Session:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, image_url, author } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO articles (title, content, image_url, author, published_date) VALUES (?, ?, ?, ?, CURDATE())',
      [title, content, image_url, author]
    );

    return NextResponse.json({ message: 'Article created successfully', articleId: (result as any).insertId });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 });
  }
}

// Add a GET function for fetching articles in the admin panel later
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('GET articles - Session:', session);

    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [articles] = await pool.query('SELECT * FROM articles ORDER BY published_date DESC');
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
} 