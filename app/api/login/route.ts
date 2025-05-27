import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log('Attempting login for email:', email); // Debug log

    if (!email || !password) {
      console.log('Missing email or password'); // Debug log
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];
    console.log('User found:', user); // Debug log

    if (!user) {
      console.log('User not found'); // Debug log
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Comparing password for user:', user.username); // Debug log
    const isValid = await bcrypt.compare(password, user.password || user.password_hash);
    console.log('Password comparison result:', isValid); // Debug log

    if (!isValid) {
      console.log('Invalid password'); // Debug log
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return the role
    console.log('Login successful, role:', user.role); // Debug log
    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('Server error during login:', error); // Debug log
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 