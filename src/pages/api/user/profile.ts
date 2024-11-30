import type { APIRoute } from 'astro';
import { getUserByEmail, updateUser } from '../../../lib/user';
import { jsonResponse, errorResponse, validateUsername } from '../../../lib/api';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT token
function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse('Invalid token', 401);
    }

    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return errorResponse('User not found', 404);
    }

    return jsonResponse({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return errorResponse('Internal server error', 500);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse('Invalid token', 401);
    }

    const body = await request.json();
    const { username } = body;

    if (username && !validateUsername(username)) {
      return errorResponse('Invalid username format');
    }

    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return errorResponse('User not found', 404);
    }

    const success = await updateUser(user.id!, { username });
    if (!success) {
      return errorResponse('Failed to update profile', 500);
    }

    const updatedUser = await getUserByEmail(decoded.email);
    return jsonResponse({
      id: updatedUser!.id,
      username: updatedUser!.username,
      email: updatedUser!.email,
      created_at: updatedUser!.created_at,
      updated_at: updatedUser!.updated_at
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return errorResponse('Internal server error', 500);
  }
};
