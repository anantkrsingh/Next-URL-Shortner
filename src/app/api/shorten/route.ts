import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateShortCode, isValidUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Check if URL already exists
    const existingUrl = await prisma.url.findFirst({
      where: { originalUrl: url }
    })

    if (existingUrl) {
      return NextResponse.json({
        originalUrl: existingUrl.originalUrl,
        shortCode: existingUrl.shortCode,
        shortUrl: `${request.nextUrl.origin}/${existingUrl.shortCode}`
      })
    }

    // Generate unique short code
    let shortCode: string
    let isUnique = false
    
    while (!isUnique) {
      shortCode = generateShortCode()
      const existing = await prisma.url.findUnique({
        where: { shortCode }
      })
      if (!existing) {
        isUnique = true
      }
    }

    // Create new URL record
    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode: shortCode!
      }
    })

    return NextResponse.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${request.nextUrl.origin}/${newUrl.shortCode}`
    })

  } catch (error) {
    console.error('Error creating short URL:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
