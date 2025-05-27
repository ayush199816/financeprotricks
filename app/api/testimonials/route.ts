import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM testimonials ORDER BY display_order ASC'
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const profession = formData.get('profession') as string;
        const comment = formData.get('comment') as string;
        const display_order = parseInt(formData.get('display_order') as string);
        const image = formData.get('image') as File;

        if (!image) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `user${uniqueSuffix}${path.extname(image.name)}`;
        const filepath = path.join(process.cwd(), 'public', 'images', 'testimonial', filename);

        // Save the file
        await writeFile(filepath, buffer);

        // Save to database
        const [result] = await pool.query(
            'INSERT INTO testimonials (name, profession, comment, imgSrc, display_order) VALUES (?, ?, ?, ?, ?)',
            [name, profession, comment, `/images/testimonial/${filename}`, display_order]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
            { status: 500 }
        );
    }
} 