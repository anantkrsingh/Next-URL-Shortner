import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import redis from '../../../../redis'

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params

    // 1. Try Redis cache
    const cachedUrl = await redis.get(shortCode);

    if (cachedUrl) {
       prisma.url.update({
        where: { shortCode },
        data: {
          clicks: { increment: 1 }
        }
      });

      return NextResponse.redirect(cachedUrl as string);
    }

    // 2. Fallback to DB
    const url = await prisma.url.findUnique({
      where: { shortCode }
    })

    if (!url) {
      return NextResponse.json(
        { error: 'Short URL not found' },
        { status: 404 }
      )
    }

    // ✅ Atomic increment
    await prisma.url.update({
      where: { id: url.id },
      data: {
        clicks: { increment: 1 }
      }
    })

    // ✅ Cache with TTL
    await redis.set(shortCode, url.originalUrl, "EX", 86400) // 1 day

    return NextResponse.redirect(url.originalUrl)

  } catch (error) {
    console.error('Error redirecting:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
