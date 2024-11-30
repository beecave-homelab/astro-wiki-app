import { pool } from './db';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export async function createUser(user: User): Promise<User | null> {
  try {
    const hashedPassword = await bcrypt.hash(user.password!, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [user.username, user.email, hashedPassword]
    );
    return { ...user, id: (result as any).insertId, password: undefined };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, email, created_at, updated_at FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0] || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = (rows as any[])[0];
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return null;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
}

export async function updateUser(id: number, updates: Partial<User>): Promise<boolean> {
  try {
    const setFields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at') {
        setFields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (setFields.length === 0) return false;
    
    setFields.push('updated_at = NOW()');
    values.push(id);
    
    await pool.execute(
      `UPDATE users SET ${setFields.join(', ')} WHERE id = ?`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
}

export async function deleteUser(id: number): Promise<boolean> {
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}
