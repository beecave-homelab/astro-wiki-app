import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Environment variables with fallbacks
const JWT_SECRET = import.meta.env.JWT_SECRET || 'development-secret-do-not-use-in-production';
if (!import.meta.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET not set in environment variables. Using insecure default secret.');
}

const JWT_EXPIRES_IN = '24h';
const COOKIE_SECURE = import.meta.env.COOKIE_SECURE === 'true';
const COOKIE_SAME_SITE = import.meta.env.COOKIE_SAME_SITE || 'lax';

// In a real application, this would be in a database
const MOCK_USER = {
    username: 'admin',
    // Password: admin123
    passwordHash: '$2a$10$hBXyHdAPkDsQbfKY6e0BXeq99mM5/xhS8e4WhJfXr8Vkn1jNaHw..'  // Using the hash that we know works
};

// Generate a new hash for testing
bcrypt.hash('admin123', 10).then(hash => {
    console.log('New hash generated:', hash);
    // Test the hash
    bcrypt.compare('admin123', hash).then(result => {
        console.log('New hash test:', result);
    });
    
    // Test stored hash
    bcrypt.compare('admin123', MOCK_USER.passwordHash).then(result => {
        console.log('Stored hash test:', result);
    });
});

export interface User {
    username: string;
    passwordHash: string;
}

export interface JWTPayload {
    username: string;
    iat?: number;
    exp?: number;
}

export class AuthService {
    static async verifyCredentials(username: string, password: string): Promise<boolean> {
        console.log('Attempting login with:', { username });
        console.log('Received password:', password); // This will help verify we're getting the correct password
        
        // In production, fetch user from database
        if (username !== MOCK_USER.username) {
            console.log('Username not found');
            return false;
        }

        const isValid = await bcrypt.compare(password, MOCK_USER.passwordHash);
        console.log('Password validation result:', isValid);
        
        return isValid;
    }

    static generateToken(username: string): string {
        const payload: JWTPayload = {
            username
        };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static verifyToken(token: string): JWTPayload | null {
        try {
            return jwt.verify(token, JWT_SECRET) as JWTPayload;
        } catch (error) {
            console.log('Token verification failed:', error);
            return null;
        }
    }

    static getCookieOptions() {
        return {
            httpOnly: true,
            secure: COOKIE_SECURE,
            sameSite: COOKIE_SAME_SITE,
            path: '/',
            maxAge: 60 * 60 * 24 // 24 hours
        };
    }

    // Utility function to hash passwords (for creating new users)
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
