import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/users`);

    try {
        const users = await db.user.findMany({
            include: {
                partnerPreferences: true,
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
