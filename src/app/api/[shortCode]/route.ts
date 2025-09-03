import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params

    const url = await prisma.url.findUnique({
      where: { shortCode }
    })

    if (!url) {
      return NextResponse.json(
        { error: 'Short URL not found' },
        { status: 404 }
      )
    }

    // Increment click count
    await prisma.url.update({
      where: { id: url.id },
      data: { clicks: url.clicks + 1 }
    })

    return NextResponse.redirect(url.originalUrl)

  } catch (error) {
    console.error('Error redirecting:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
