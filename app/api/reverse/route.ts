import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // 1. 从 URL 中获取经纬度
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
        return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
    }

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`,
            {
                headers: {
                    'User-Agent': 'WobitechTestApp/1.0',
                },
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch address' }, { status: 500 });
    }
}