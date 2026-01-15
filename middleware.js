import { NextResponse } from "next/server";

/**
 * Simplified middleware - auth is handled via API routes and server components.
 * This just passes all requests through.
 */
export default function middleware() {
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};