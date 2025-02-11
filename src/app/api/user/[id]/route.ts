import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at ${req.nextUrl.pathname}`);

    const userId = req.nextUrl.pathname.split('/').pop();

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                partnerPreferences: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
