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
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      {success && (
        <div className="mb-4 text-green-600 text-sm">{success}</div>
      )}

      <div className="space-y-4">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setNewUsername(user.username);
                }}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 text-gray-900">{user.username}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 text-gray-900">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <div className="mt-1 text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
