import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getSession({ req });

    // if (!session) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    const { userId } = req.query;

    if (req.method === 'PUT') {
        try {
            const data = profileSchema.parse(req.body);

            const updatedUser = await updateUserProfile(userId as string, data);

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ message: 'Invalid data', error });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
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
