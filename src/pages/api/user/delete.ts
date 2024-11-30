import type { APIRoute } from 'astro';
import { getUserByEmail, deleteUser } from '../../../lib/user';
import { jsonResponse, errorResponse } from '../../../lib/api';
import jwt from 'jsonwebtoken';

function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

export const DELETE: APIRoute = async ({ request }) => {
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

    const success = await deleteUser(user.id!);
    if (!success) {
      return errorResponse('Failed to delete account', 500);
    }

    return jsonResponse({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    return errorResponse('Internal server error', 500);
  }
};
