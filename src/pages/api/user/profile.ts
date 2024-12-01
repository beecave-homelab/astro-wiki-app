import type { APIRoute } from 'astro';
import { getUserByEmail, updateUser } from '../../../lib/user';
import { jsonResponse, errorResponse, validateUsername } from '../../../lib/api';
import { verifyAuthToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  try {
    const decoded = verifyAuthToken(request);
    if (!decoded) {
      return errorResponse('Unauthorized', 401);
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
    const decoded = verifyAuthToken(request);
    if (!decoded) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { username } = body;

    if (!username) {
      return errorResponse('Username is required');
    }

    if (!validateUsername(username)) {
      return errorResponse('Invalid username format');
    }

    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return errorResponse('User not found', 404);
    }

    const updated = await updateUser(user.id, { username });
    if (!updated) {
      return errorResponse('Failed to update profile');
    }

    return jsonResponse({
      id: updated.id,
      username: updated.username,
      email: updated.email,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return errorResponse('Internal server error', 500);
  }
};
