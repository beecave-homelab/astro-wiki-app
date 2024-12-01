import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { pool } from '../../../lib/db';
import { verifyAuthToken } from '../../../lib/auth';
import { errorResponse, jsonResponse } from '../../../lib/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const decoded = verifyAuthToken(request);
    if (!decoded) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return errorResponse('Missing required fields');
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
      return errorResponse('User not found', 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userData.password_hash);
    if (!isValidPassword) {
      return errorResponse('Current password is incorrect', 400);
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

    return jsonResponse({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return errorResponse('Internal server error', 500);
  }
};
