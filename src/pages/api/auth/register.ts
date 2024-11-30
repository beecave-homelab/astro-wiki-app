import type { APIRoute } from 'astro';
import { createUser, getUserByEmail } from '../../../lib/user';
import { jsonResponse, errorResponse, validateEmail, validatePassword, validateUsername } from '../../../lib/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate input
    if (!username || !email || !password) {
      return errorResponse('Missing required fields');
    }

    if (!validateUsername(username)) {
      return errorResponse('Invalid username format');
    }

    if (!validateEmail(email)) {
      return errorResponse('Invalid email format');
    }

    if (!validatePassword(password)) {
      return errorResponse('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return errorResponse('Email already registered', 409);
    }

    // Create user
    const user = await createUser({ username, email, password });
    if (!user) {
      return errorResponse('Failed to create user', 500);
    }

    return jsonResponse({ 
      id: user.id,
      username: user.username,
      email: user.email
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse('Internal server error', 500);
  }
};
