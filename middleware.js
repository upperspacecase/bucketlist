import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

/**
 * IMPORTANT:
 * Middleware runs on every request (per matcher below). If you configure a provider
 * without the required env vars, NextAuth can throw and the whole site becomes a 500.
 *
 * For beta/dev environments where Google OAuth isn't configured, we no-op.
 */
const hasGoogleOAuth = Boolean(process.env.GOOGLE_ID && process.env.GOOGLE_SECRET);
const hasNextAuthSecret = Boolean(process.env.NEXTAUTH_SECRET);

if (!hasGoogleOAuth || !hasNextAuthSecret) {
  // No-op middleware to avoid crashing when env vars are not configured.
  // Auth-protected routes are handled via server components (e.g. /dashboard/layout.js).
  // eslint-disable-next-line import/no-default-export
  export default function middleware() {
    return NextResponse.next();
  }
} else {
  // Edge-compatible configuration for middleware (without EmailProvider and MongoDB adapter)
  const { auth } = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  });

  // eslint-disable-next-line import/no-default-export
  export default auth(async function middleware() {
    // No custom middleware logic needed yet.
    return NextResponse.next();
  });
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};