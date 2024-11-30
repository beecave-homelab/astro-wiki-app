import { defineMiddleware } from 'astro:middleware';
import rateLimit from 'express-rate-limit';
import { AuthService } from '../lib/auth';

// Rate limiting configuration
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: 'Too many login attempts, please try again after 15 minutes'
});

// Authentication middleware
export const authMiddleware = defineMiddleware(async (context, next) => {
    const token = context.cookies.get('session')?.value;
    
    // Protected routes that require authentication
    const protectedRoutes = ['/backend'];
    const isProtectedRoute = protectedRoutes.some(route => 
        context.url.pathname.startsWith(route)
    );

    if (!token && isProtectedRoute) {
        return Response.redirect(`${context.url.origin}/login`, 302);
    }

    // Verify JWT token
    if (token) {
        const payload = AuthService.verifyToken(token);
        if (!payload && isProtectedRoute) {
            // Invalid or expired token
            context.cookies.delete('session');
            return Response.redirect(`${context.url.origin}/login`, 302);
        }
        
        // Add user info to locals for use in routes
        context.locals.user = payload;
    }

    return await next();
});
