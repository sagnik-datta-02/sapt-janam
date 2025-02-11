import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/create-profile`);

    const body = await req.json();
    const { id: userId, fullName, dob, height, motherTongue, religion, maritalStatus, gender, income, education, occupation, about, interests, profileImage, partnerPreferences } = body;
    console.log('Request body:', body);

    if (!userId) {
        console.log('Missing user ID in request body');
        return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
    }

    if (!fullName || !dob || !height || !motherTongue || !religion || !maritalStatus || !gender || !income || !education || !occupation || !about || !interests || !partnerPreferences) {
        console.log('Missing required fields');
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const profile = await db.user.update({
            where: { id: userId },
            data: {
                fullName,
                dob: new Date(dob),
                height,
                motherTongue,
                religion,
                maritalStatus,
                gender,
                income,
                education,
                occupation,
                about,
                interests,
                profileImage,
                partnerPreferences: {
                    create: {
                        gender: partnerPreferences.gender,
                        ageRangeFrom: parseInt(partnerPreferences.ageRange.from),
                        ageRangeTo: parseInt(partnerPreferences.ageRange.to),
                        heightRangeFrom: partnerPreferences.heightRange.from,
                        heightRangeTo: partnerPreferences.heightRange.to,
                        religion: partnerPreferences.religion,
                        motherTongue: partnerPreferences.motherTongue,
                        maritalStatus: partnerPreferences.maritalStatus,
                        education: partnerPreferences.education,
                        occupation: partnerPreferences.occupation,
                        income: partnerPreferences.income,
                    }
                }
            }
        });

        console.log('Profile created:', profile);
        return NextResponse.json({message:'Profile created successfully'}, { status: 201 });
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    console.log(`Received ${req.method} request at /api/create-profile`);
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
