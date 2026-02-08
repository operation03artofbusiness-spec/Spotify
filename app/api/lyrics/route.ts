import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get('track');
  const artist = searchParams.get('artist');

  if (!track || !artist) {
    return NextResponse.json({ lyrics: 'Lyrics unavailable.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(track)}`);
    const data = await response.json();
    return NextResponse.json({ lyrics: data.lyrics ?? 'Lyrics unavailable.' });
  } catch (error) {
    return NextResponse.json({ lyrics: 'Lyrics unavailable.' }, { status: 500 });
  }
}
