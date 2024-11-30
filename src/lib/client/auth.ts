interface AuthResponse {
  success: boolean;
  data?: {
    token?: string;
    user?: any;
    message?: string;
  };
  error?: string;
}

export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success && data.data?.token) {
      localStorage.setItem('auth_token', data.data.token);
    }
    return data;
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
}

export function logout() {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
}

export async function getProfile(): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch('/api/user/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
}

export async function updateProfile(username: string): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
}

export async function deleteAccount(): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (data.success) {
      localStorage.removeItem('auth_token');
    }
    return data;
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
}
