import { useState } from 'react';
import { register, login } from '../../lib/client/auth';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (type === 'register') {
        const result = await register(formData.username, formData.email, formData.password);
        if (result.success) {
          setSuccess('Registration successful! Please log in.');
          setTimeout(() => window.location.href = '/login', 2000);
        } else {
          setError(result.error || 'Registration failed');
        }
      } else {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          window.location.href = '/profile';
        } else {
          setError(result.error || 'Login failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 dark:bg-dark-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        {type === 'login' ? 'Login' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1 dark:text-gray-200">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-400 dark:text-white dark:border-dark-500"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-dark-400 dark:text-white dark:border-dark-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 dark:text-gray-200">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-md dark:bg-dark-400 dark:text-white dark:border-dark-500"
          />
        </div>

        {error && <div className="text-red-500 text-sm dark:text-red-400">{error}</div>}
        {success && <div className="text-green-500 text-sm dark:text-green-400">{success}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}
