import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import db from '../../../lib/db';

export async function POST(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/sign-up`);

    const body = await req.json();
    const { name, email, password, confirmPassword } = body;
    console.log('Request body:', body);

    if (!name || !email || !password || !confirmPassword) {
        console.log('Missing required fields');
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log('User already exists:', email);
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Create new user
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        console.log('New user created:', newUser);
        return NextResponse.json({ id: newUser.id }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/sign-up`);
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
