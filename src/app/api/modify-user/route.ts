import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileSchema = z.object({
    userId: z.string().uuid(),
    profilePicture: z.string().url().optional(),
    aboutMe: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/modify-user`);

    try {
        const data = profileSchema.parse(await req.json());

        const updatedUser = await updateUserProfile(data);

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ message: 'Invalid data', error }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/modify-user`);
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}

async function updateUserProfile(data: any) {
    const updateData: any = {};

    if (data.profilePicture !== undefined) {
        updateData.profileImage = data.profilePicture;
    }

    if (data.aboutMe !== undefined) {
        updateData.about = data.aboutMe;
    }

    const updatedUser = await prisma.user.update({
        where: { id: data.userId },
        data: updateData,
    });

    return updatedUser;
}
