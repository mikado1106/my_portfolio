import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://mikhaeledo.com',
  'https://www.mikhaeledo.com',
  'http://localhost:3003',
  'http://localhost:3000',
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripControlChars(str: string): string {
  return str.replace(/[\r\n\t\x00-\x1f\x7f]/g, ' ').trim();
}

export async function POST(request: Request) {
  // Origin check — block direct API abuse from other origins
  const origin = request.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();

    // Honeypot — bots fill this, humans don't
    const honeypot = typeof body.website === 'string' ? body.website : '';
    if (honeypot) {
      return NextResponse.json({ success: true }); // silent reject
    }

    const name = typeof body.name === 'string' ? stripControlChars(body.name).slice(0, 200) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'edomikhael@gmail.com',
      subject: `New Message from ${safeName} via Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Contact Message from Portfolio</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
