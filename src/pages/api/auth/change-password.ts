import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { pool } from '../../../lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Fetching user with email:', decoded.email);
    
    // Get current password hash from database
    const [rows] = await pool.execute(
      'SELECT id, password_hash FROM users WHERE email = ?',
      [decoded.email]
    ) as [any[], any];

    const userData = rows[0];
    console.log('User data found:', userData ? 'yes' : 'no');

    if (!userData) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userData.password_hash);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    console.log('Updating password for user ID:', userData.id);
    
    // Update password in database
    await pool.execute(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userData.id]
    );

    return new Response(JSON.stringify({ message: 'Password updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error changing password:', error);
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
