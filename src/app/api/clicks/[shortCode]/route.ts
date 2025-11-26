import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params

    const url = await prisma.url.findUnique({
      where: { shortCode },
      select: {
        clicks: true,
        originalUrl: true,
        shortCode: true,
        createdAt: true,
      }
    })

    if (!url) {
      return NextResponse.json(
        { error: 'Short URL not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      shortCode: url.shortCode,
      clicks: url.clicks,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
    })

  } catch (error) {
    console.error('Error fetching click count:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

