import { ChangePasswordForm } from './ChangePasswordForm';

export function ChangePasswordWrapper() {
  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to change password');
    }
  };

  return <ChangePasswordForm onSubmit={handlePasswordChange} />;
}
