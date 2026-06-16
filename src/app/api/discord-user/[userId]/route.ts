import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'Token not configured' }, { status: 500 });
  }

  try {
    // Memanggil API Discord untuk mengambil data user
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: { Authorization: `Bot ${token}` }
    });
    
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch from Discord' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
