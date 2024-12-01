import { useState, useEffect } from 'react';
import { getProfile, updateProfile, deleteAccount, logout } from '../../lib/client/auth';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await getProfile();
    if (result.success && result.data) {
      setUser(result.data);
      setNewUsername(result.data.username);
    } else {
      window.location.href = '/login';
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await updateProfile(newUsername);
    if (result.success) {
      setSuccess('Profile updated successfully');
      setUser(result.data);
      setEditing(false);
    } else {
      setError(result.error || 'Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const result = await deleteAccount();
      if (result.success) {
        window.location.href = '/login';
      } else {
        setError(result.error || 'Failed to delete account');
      }
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 dark:bg-dark-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Profile</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-dark-400 text-white rounded-md hover:bg-dark-500 transition-colors"
        >
          Logout
        </button>
      </div>
      
      {error && <div className="text-red-500 mb-4 dark:text-red-400">{error}</div>}
      {success && <div className="text-green-500 mb-4 dark:text-green-400">{success}</div>}
      
      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1 dark:text-gray-200">Username</label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-400 dark:text-white dark:border-dark-500"
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setNewUsername(user.username);
              }}
              className="bg-dark-400 text-white px-4 py-2 rounded-md hover:bg-dark-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium dark:text-gray-400">Username</p>
            <p className="mt-1 dark:text-white">{user.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium dark:text-gray-400">Email</p>
            <p className="mt-1 dark:text-white">{user.email}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              Edit Profile
            </button>
            <a
              href="/change-password"
              className="block bg-green-600 text-white text-center px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
            >
              Change Password
            </a>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
