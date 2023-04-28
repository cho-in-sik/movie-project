import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('ACCESS_TOKEN');

  if (request.nextUrl.pathname.includes('sign-in') && token)
    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/sign-in'],
};