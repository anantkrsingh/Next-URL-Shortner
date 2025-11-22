import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateShortCode, isValidUrl } from '@/lib/utils'
import redis from '../../../../redis'

export async function POST(request: NextRequest) {
  try {
    const { url, customAlias } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const cachedUrl = await redis.get(url);

    if (cachedUrl && !customAlias) {
      console.log("Sending from cache")
      return NextResponse.json(
        { originalUrl: cachedUrl, shortCode: cachedUrl, shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${cachedUrl}` },
        { status: 201 }
      )
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    if (customAlias) {
      const aliasRegex = /^[a-zA-Z0-9_-]+$/
      if (!aliasRegex.test(customAlias)) {
        return NextResponse.json(
          { error: 'Custom alias can only contain letters, numbers, hyphens, and underscores' },
          { status: 400 }
        )
      }

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

      const existingAlias = await prisma.url.findFirst({
        where: {
          OR: [
            { customAlias: customAlias },
            { shortCode: customAlias }
          ]
        }
      })

      if (existingAlias && existingAlias.customAlias === customAlias && existingAlias.originalUrl === url) {
        await redis.set(customAlias, url);
        await redis.set(url, customAlias);
        return NextResponse.json(
          {
            originalUrl: existingAlias.originalUrl,
            shortCode: existingAlias.shortCode,
            shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${existingAlias.shortCode}`
          }
        )
      } else if (existingAlias && existingAlias.customAlias === customAlias && existingAlias.originalUrl !== url) {
        return NextResponse.json(
          { error: 'Custom alias is already taken' },
          { status: 400 }
        )
      }
    }

    let shortCode: string
    if (customAlias) {
      shortCode = customAlias
    } else {
      const existingUrl = await prisma.url.findFirst({
        where: {
          originalUrl: url,
          customAlias: null
        }
      })

      if (existingUrl) {
        await redis.set(existingUrl.shortCode, existingUrl.originalUrl);
        await redis.set(existingUrl.originalUrl, existingUrl.shortCode);
        return NextResponse.json({
          originalUrl: existingUrl.originalUrl,
          shortCode: existingUrl.shortCode,
          shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${existingUrl.shortCode}`
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

    await redis.set(newUrl.shortCode, newUrl.originalUrl);
    await redis.set(newUrl.originalUrl, newUrl.shortCode);
    return NextResponse.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${newUrl.shortCode}`
    })

  } catch (error) {
    console.error('Error creating short URL:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
