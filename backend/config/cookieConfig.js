/**
 * Standard secure cookie options configuration
 * Reusable across login, registration, and logout routes
 */
export const cookieOptions = {
    httpOnly: true,                 // Block client-side script access (XSS protection)
    secure: process.env.NODE_ENV === "production", // Require HTTPS connection in production
    sameSite: "strict",             // Prevent Cross-Site Request Forgery (CSRF)
    maxAge: 30 * 24 * 60 * 60 * 1000 // Expiration handling (30 days in milliseconds)
};
