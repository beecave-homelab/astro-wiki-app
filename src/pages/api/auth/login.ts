import type { APIRoute } from 'astro';
import { verifyUser } from '../../../lib/user';
import { errorResponse } from '../../../lib/api';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return errorResponse('Missing email or password');
    }

    // Verify user credentials
    const user = await verifyUser(email, password);
    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with token in both body and cookie
    const response = new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Set secure cookie with the token
    response.headers.append(
      'Set-Cookie',
      `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Internal server error', 500);
  }
};
