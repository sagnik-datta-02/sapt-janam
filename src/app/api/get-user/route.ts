import { NextRequest, NextResponse } from 'next/server';
// import { OAuth2Client } from 'google-auth-library';
import db from '../../../lib/db';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/get-user`);

    const body = await req.json();
    const { email } = body;
    console.log('Request body:', body);

    if (!email) {
        console.log('Missing token');
        return NextResponse.json({ message: 'Missing email' }, { status: 400 });
    }

    try {
        // Verify the Google token
        // const ticket = await client.verifyIdToken({
        //     idToken: token,
        //     audience: process.env.GOOGLE_CLIENT_ID,
        // });
        // const payload = ticket.getPayload();
        // const email = payload?.email;
        // console.log('Decoded email:', email);

        // if (!email) {
        //     console.log('Invalid token');
        //     return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        // }

        // Check if user exists
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log('User not found:', email);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        console.log('User found:', user);
        return NextResponse.json({ id: user.id }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/get-user`);
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
