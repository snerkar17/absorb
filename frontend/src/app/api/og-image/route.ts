import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

const FETCH_TIMEOUT_MS = 5000

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get('url')
  if (!targetUrl) {
    return NextResponse.json({ image: null }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(targetUrl)
  } catch {
    return NextResponse.json({ image: null }, { status: 400 })
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return NextResponse.json({ image: null }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AbsorbBot/1.0)' },
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return NextResponse.json({ image: null })
    }

    const html = await res.text()
    const $ = cheerio.load(html)
    const image =
      $('meta[property="og:image"]').attr('content') ??
      $('meta[name="og:image"]').attr('content') ??
      null

    return NextResponse.json({ image })
  } catch {
    return NextResponse.json({ image: null })
  }
}
