import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateShortCode, isValidUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { url, customAlias } = await request.json()

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

    // Validate custom alias if provided
    if (customAlias) {
      // Check if custom alias contains only valid characters (alphanumeric, hyphens, underscores)
      const aliasRegex = /^[a-zA-Z0-9_-]+$/
      if (!aliasRegex.test(customAlias)) {
        return NextResponse.json(
          { error: 'Custom alias can only contain letters, numbers, hyphens, and underscores' },
          { status: 400 }
        )
      }

      // Check if custom alias is too short or too long
      if (customAlias.length < 3) {
        return NextResponse.json(
          { error: 'Custom alias must be at least 3 characters long' },
          { status: 400 }
        )
      }

      if (customAlias.length > 50) {
        return NextResponse.json(
          { error: 'Custom alias must be 50 characters or less' },
          { status: 400 }
        )
      }

      // Check if custom alias is already taken
      const existingAlias = await prisma.url.findFirst({
        where: {
          OR: [
            { customAlias: customAlias },
            { shortCode: customAlias }
          ]
        }
      })

      if (existingAlias && existingAlias.customAlias === customAlias && existingAlias.originalUrl === url) {
        return NextResponse.json(
          {
            originalUrl: existingAlias.originalUrl,
            shortCode: existingAlias.shortCode,
            shortUrl: `${request.nextUrl.origin}/${existingAlias.shortCode}`
          }
        )
      }else if (existingAlias && existingAlias.customAlias === customAlias && existingAlias.originalUrl !== url) {
        return NextResponse.json(
          { error: 'Custom alias is already taken' },
          { status: 400 }
        )
      }
    }

    // If custom alias is provided, use it as the short code
    let shortCode: string
    if (customAlias) {
      shortCode = customAlias
    } else {
      // Check if URL already exists (only for non-custom aliases)
      const existingUrl = await prisma.url.findFirst({
        where: {
          originalUrl: url,
          customAlias: null // Only check existing URLs without custom aliases
        }
      })

      if (existingUrl) {
        return NextResponse.json({
          originalUrl: existingUrl.originalUrl,
          shortCode: existingUrl.shortCode,
          shortUrl: `${request.nextUrl.origin}/${existingUrl.shortCode}`
        })
      }

      // Generate random short code
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
    }

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode: shortCode!,
        customAlias: customAlias || null
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
