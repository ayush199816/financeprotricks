import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // First, increment the view count
        await pool.query(
            'UPDATE articles SET views = COALESCE(views, 0) + 1 WHERE id = ?',
            [params.id]
        );

        // Then fetch the article
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM articles WHERE id = ?',
            [params.id]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
} 