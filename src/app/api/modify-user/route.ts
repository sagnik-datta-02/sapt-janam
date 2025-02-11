import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileSchema = z.object({
    profilePicture: z.string().url().optional(),
    aboutMe: z.string().optional(),
    age: z.number().optional(),
    gender: z.string().optional(),
    attributes: z.string().optional(),
    fullName: z.string().optional(),
    dob: z.string().optional(),
    height: z.string().optional(),
    motherTongue: z.string().optional(),
    religion: z.string().optional(),
    maritalStatus: z.string().optional(),
    income: z.string().optional(),
    education: z.string().optional(),
    occupation: z.string().optional(),
    interests: z.string().optional(),
    partnerPreferences: z.object({
        gender: z.string().optional(),
        ageRangeFrom: z.number().optional(),
        ageRangeTo: z.number().optional(),
        heightRangeFrom: z.string().optional(),
        heightRangeTo: z.string().optional(),
        religion: z.string().optional(),
        motherTongue: z.string().optional(),
        maritalStatus: z.string().optional(),
        education: z.string().optional(),
        occupation: z.string().optional(),
        income: z.string().optional(),
    }).optional(),
});

export async function PUT(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/modify-user`);

    const userId = req.nextUrl.pathname.split('/').pop();

    try {
        const data = profileSchema.parse(await req.json());

        const updatedUser = await updateUserProfile(userId as string, data);

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

async function updateUserProfile(userId: string, data: any) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            fullName: data.fullName,
            dob: data.dob ? new Date(data.dob) : undefined,
            height: data.height,
            motherTongue: data.motherTongue,
            religion: data.religion,
            maritalStatus: data.maritalStatus,
            gender: data.gender,
            income: data.income,
            education: data.education,
            occupation: data.occupation,
            about: data.aboutMe,
            interests: data.interests ? data.interests.split(',').map((interest: string) => interest.trim()) : undefined,
            profileImage: data.profilePicture,
            partnerPreferences: data.partnerPreferences ? {
                update: {
                    gender: data.partnerPreferences.gender,
                    ageRangeFrom: data.partnerPreferences.ageRangeFrom,
                    ageRangeTo: data.partnerPreferences.ageRangeTo,
                    heightRangeFrom: data.partnerPreferences.heightRangeFrom,
                    heightRangeTo: data.partnerPreferences.heightRangeTo,
                    religion: data.partnerPreferences.religion,
                    motherTongue: data.partnerPreferences.motherTongue,
                    maritalStatus: data.partnerPreferences.maritalStatus,
                    education: data.partnerPreferences.education,
                    occupation: data.partnerPreferences.occupation,
                    income: data.partnerPreferences.income,
                }
            } : undefined,
        },
    });

    return updatedUser;
}
