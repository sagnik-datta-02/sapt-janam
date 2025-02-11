'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaHeart, FaCamera } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/app/components/Navbar';

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

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    const { data: session } = useSession();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        if (userId) {
            fetch(`/api/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setValue('fullName', data.fullName);
                    setValue('dob', data.dob);
                    setValue('height', data.height);
                    setValue('motherTongue', data.motherTongue);
                    setValue('religion', data.religion);
                    setValue('maritalStatus', data.maritalStatus);
                    setValue('income', data.income);
                    setValue('education', data.education);
                    setValue('occupation', data.occupation);
                    setValue('aboutMe', data.about);
                    setValue('interests', data.interests.join(', '));
                    setValue('partnerPreferences', data.partnerPreferences);
                    setProfilePicture(data.profileImage);
                });
        }
    }, [setValue]);

    const onSubmit = (data: ProfileFormData) => {
        console.log(data);
        const userId = sessionStorage.getItem('id');
        if (userId) {
            fetch(`/api/modify-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                });
        }
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePicture(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8 px-4"
            >
                <Card className="max-w-4xl mx-auto border-red-100 shadow-xl">
                    <CardHeader>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center mb-4"
                        >
                            <FaHeart className="h-12 w-12 text-red-500" />
                        </motion.div>
                        <CardTitle className="text-3xl font-serif text-center text-red-600">
                            Update Your Profile ✨
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex flex-col items-center gap-6">
                                <Label className="text-2xl font-serif text-red-600">Profile Picture</Label>
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative group"
                                >
                                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-red-200 shadow-lg hover:border-red-300 transition-all duration-300">
                                        {profilePicture ? (
                                            <img
                                                src={profilePicture}
                                                alt="Profile"
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-pink-50">
                                                <FaCamera className="w-16 h-16 text-red-300 mb-2" />
                                                <p className="text-sm text-red-400">Click to upload</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    className="bg-white/90 hover:bg-white"
                                                    onClick={() => document.getElementById('profilePicture')?.click()}
                                                >
                                                    {profilePicture ? 'Change Photo' : 'Upload Photo'}
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                                {profilePicture && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-sm text-gray-500"
                                    >
                                        Click on the image to change your photo
                                    </motion.div>
                                )}
                                <input
                                    type="file"
                                    id="profilePicture"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input {...register('fullName')} />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Date of Birth</Label>
                                    <Input type='date' {...register('dob')} />
                                    {errors.dob && (
                                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Height</Label>
                                    <Select onValueChange={(value) => setValue('height', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select height" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px] overflow-y-auto">
                                            {Array.from({ length: 37 }, (_, i) => {
                                                const feet = Math.floor((48 + i) / 12);
                                                const inches = (48 + i) % 12;
                                                const heightStr = `${feet}' ${inches}"`;
                                                const heightCm = Math.round(((feet * 12) + inches) * 2.54);
                                                return (
                                                    <SelectItem 
                                                        key={i} 
                                                        value={heightStr}
                                                    >
                                                        {`${heightStr} (${heightCm} cm)`}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {errors.height && (
                                        <p className="text-red-500 text-sm">{errors.height.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <Select onValueChange={(value) => setValue('gender', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && (
                                        <p className="text-red-500 text-sm">{errors.gender.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mother Tongue</Label>
                                    <Select onValueChange={(value) => setValue('motherTongue', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hindi">Hindi</SelectItem>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="punjabi">Punjabi</SelectItem>
                                            <SelectItem value="gujarati">Gujarati</SelectItem>
                                            <SelectItem value="bengali">Bengali</SelectItem>
                                            <SelectItem value="telugu">Telugu</SelectItem>
                                            <SelectItem value="tamil">Tamil</SelectItem>
                                            <SelectItem value="marathi">Marathi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.motherTongue && (
                                        <p className="text-red-500 text-sm">{errors.motherTongue.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Religion</Label>
                                    <Select onValueChange={(value) => setValue('religion', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select religion" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hindu">Hindu</SelectItem>
                                            <SelectItem value="muslim">Muslim</SelectItem>
                                            <SelectItem value="sikh">Sikh</SelectItem>
                                            <SelectItem value="christian">Christian</SelectItem>
                                            <SelectItem value="jain">Jain</SelectItem>
                                            <SelectItem value="buddhist">Buddhist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.religion && (
                                        <p className="text-red-500 text-sm">{errors.religion.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Marital Status</Label>
                                    <Select onValueChange={(value) => setValue('maritalStatus', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="never_married">Never Married</SelectItem>
                                            <SelectItem value="divorced">Divorced</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.maritalStatus && (
                                        <p className="text-red-500 text-sm">{errors.maritalStatus.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Education</Label>
                                    <Select onValueChange={(value) => setValue('education', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Education" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high_school">High School</SelectItem>
                                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                            <SelectItem value="masters">Master's Degree</SelectItem>
                                            <SelectItem value="phd">Ph.D.</SelectItem>
                                            <SelectItem value="diploma">Diploma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.education && (
                                        <p className="text-red-500 text-sm">{errors.education.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Occupation</Label>
                                    <Select onValueChange={(value) => setValue('occupation', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Occupation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="software_engineer">Software Engineer</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                            <SelectItem value="lawyer">Lawyer</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                            <SelectItem value="accountant">Accountant</SelectItem>
                                            <SelectItem value="architect">Architect</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.occupation && (
                                        <p className="text-red-500 text-sm">{errors.occupation.message}</p>
                                    )}
                                </div>
                                <div className='space-y-2'>
                                    <Label>Annual Income</Label>
                                    <Select onValueChange={(value) => setValue('income', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Income" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-2">0-2 Lakh</SelectItem>
                                            <SelectItem value="2-4">2-4 Lakh</SelectItem>
                                            <SelectItem value="4-6">4-6 Lakh</SelectItem>
                                            <SelectItem value="6-8">6-8 Lakh</SelectItem>
                                            <SelectItem value="8-10">8-10 Lakh</SelectItem>
                                            <SelectItem value="10+">10+ Lakh</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.income && (
                                        <p className="text-red-500 text-sm">{errors.income.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Label className="text-lg font-serif text-red-600">About Me</Label>
                                <Textarea
                                    {...register('aboutMe')}
                                    placeholder="Tell us about yourself..."
                                    className="min-h-[150px]"
                                />
                                {errors.aboutMe && (
                                    <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>
                                )}
                            </div>

                            <div className="space-y-6">
                                <Label className="text-lg font-serif text-red-600">Interests</Label>
                                <Input {...register('interests')} placeholder="Enter your interests separated by commas" />
                                {errors.interests && (
                                    <p className="text-red-500 text-sm">{errors.interests.message}</p>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold mt-6">Partner Preferences</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.gender', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.gender && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.gender.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Age Range</Label>
                                    <div className="flex gap-4">
                                        <Select onValueChange={(value) => setValue('partnerPreferences.ageRangeFrom', parseInt(value))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="From" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                                    <SelectItem key={age} value={age.toString()}>
                                                        {age} years
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={(value) => setValue('partnerPreferences.ageRangeTo', parseInt(value))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="To" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                                    <SelectItem key={age} value={age.toString()}>
                                                        {age} years
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {errors.partnerPreferences?.ageRangeFrom && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.ageRangeFrom.message}</p>
                                    )}
                                    {errors.partnerPreferences?.ageRangeTo && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.ageRangeTo.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Height Range</Label>
                                    <div className="flex gap-4">
                                        <Select onValueChange={(value) => setValue('partnerPreferences.heightRangeFrom', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="From" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[200px] overflow-y-auto">
                                                {Array.from({ length: 37 }, (_, i) => {
                                                    const feet = Math.floor((48 + i) / 12);
                                                    const inches = (48 + i) % 12;
                                                    const heightStr = `${feet}' ${inches}"`;
                                                    const heightCm = Math.round(((feet * 12) + inches) * 2.54);
                                                    return (
                                                        <SelectItem 
                                                            key={i} 
                                                            value={heightStr}
                                                        >
                                                            {`${heightStr} (${heightCm} cm)`}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={(value) => setValue('partnerPreferences.heightRangeTo', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="To" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[200px] overflow-y-auto">
                                                {Array.from({ length: 37 }, (_, i) => {
                                                    const feet = Math.floor((48 + i) / 12);
                                                    const inches = (48 + i) % 12;
                                                    const heightStr = `${feet}' ${inches}"`;
                                                    const heightCm = Math.round(((feet * 12) + inches) * 2.54);
                                                    return (
                                                        <SelectItem 
                                                            key={i} 
                                                            value={heightStr}
                                                        >
                                                            {`${heightStr} (${heightCm} cm)`}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {errors.partnerPreferences?.heightRangeFrom && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.heightRangeFrom.message}</p>
                                    )}
                                    {errors.partnerPreferences?.heightRangeTo && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.heightRangeTo.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Religion</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.religion', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select religion" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hindu">Hindu</SelectItem>
                                            <SelectItem value="muslim">Muslim</SelectItem>
                                            <SelectItem value="sikh">Sikh</SelectItem>
                                            <SelectItem value="christian">Christian</SelectItem>
                                            <SelectItem value="jain">Jain</SelectItem>
                                            <SelectItem value="buddhist">Buddhist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.religion && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.religion.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mother Tongue</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.motherTongue', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hindi">Hindi</SelectItem>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="punjabi">Punjabi</SelectItem>
                                            <SelectItem value="gujarati">Gujarati</SelectItem>
                                            <SelectItem value="bengali">Bengali</SelectItem>
                                            <SelectItem value="telugu">Telugu</SelectItem>
                                            <SelectItem value="tamil">Tamil</SelectItem>
                                            <SelectItem value="marathi">Marathi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.motherTongue && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.motherTongue.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Marital Status</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.maritalStatus', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="never_married">Never Married</SelectItem>
                                            <SelectItem value="divorced">Divorced</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.maritalStatus && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.maritalStatus.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Education</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.education', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Education" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high_school">High School</SelectItem>
                                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                            <SelectItem value="masters">Master's Degree</SelectItem>
                                            <SelectItem value="phd">Ph.D.</SelectItem>
                                            <SelectItem value="diploma">Diploma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.education && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.education.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Occupation</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.occupation', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Occupation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="software_engineer">Software Engineer</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                            <SelectItem value="lawyer">Lawyer</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                            <SelectItem value="accountant">Accountant</SelectItem>
                                            <SelectItem value="architect">Architect</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.occupation && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.occupation.message}</p>
                                    )}
                                </div>
                                <div className='space-y-2'>
                                    <Label>Annual Income</Label>
                                    <Select onValueChange={(value) => setValue('partnerPreferences.income', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Income" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-2">0-2 Lakh</SelectItem>
                                            <SelectItem value="2-4">2-4 Lakh</SelectItem>
                                            <SelectItem value="4-6">4-6 Lakh</SelectItem>
                                            <SelectItem value="6-8">6-8 Lakh</SelectItem>
                                            <SelectItem value="8-10">8-10 Lakh</SelectItem>
                                            <SelectItem value="10+">10+ Lakh</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.partnerPreferences?.income && (
                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.income.message}</p>
                                    )}
                                </div>
                            </div>
                            <Button type="submit" className="mt-4">Save</Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-gray-500 text-sm">Make sure to fill all the required fields.</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </>
    );
};

export default ProfilePage;
