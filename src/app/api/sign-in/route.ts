import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import db from '../../../lib/db';
import { string } from 'zod';

export async function POST(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/sign-in`);

    const body = await req.json();
    const { email, password } = body;
    console.log('Request body:', body);

    if (!email || !password) {
        console.log('Missing required fields');
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        // Check if user exists
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Check if password matches
        const isPasswordValid = await compare(password, user.password as string);
        if (!isPasswordValid) {
            console.log('Invalid credentials');
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        console.log('Signed in successfully');
        return NextResponse.json({ message: 'Signed in successfully', id: user.id }, { status: 200 });
    } catch (error) {
        console.log('Error signing in:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/sign-in`);
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
