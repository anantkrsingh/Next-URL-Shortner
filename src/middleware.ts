import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './lib/prisma'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and the main page
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Extract short code from pathname (remove leading slash)
  const shortCode = pathname.slice(1)

  // Check if it's a valid short code (alphanumeric, 6 characters)
  if (!/^[a-zA-Z0-9]{6}$/.test(shortCode)) {
    return NextResponse.next()
  }

  try {
    // Look up the URL in the database
    const url = await prisma.url.findUnique({
      where: { shortCode }
    })

    if (!url) {
      // If URL not found, redirect to home page with error
      return NextResponse.redirect(new URL('/?error=not-found', request.url))
    }

    // Increment click count
    await prisma.url.update({
      where: { id: url.id },
      data: { clicks: url.clicks + 1 }
    })

    // Redirect to the original URL
    return NextResponse.redirect(url.originalUrl)

  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to home page
    return NextResponse.redirect(new URL('/?error=server-error', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
