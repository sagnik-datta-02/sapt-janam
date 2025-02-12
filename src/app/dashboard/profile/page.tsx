'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaHeart, FaCamera } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/app/components/Navbar';

const profileSchema = z.object({
    profilePicture: z.string().url().optional(),
    aboutMe: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    const { data: session } = useSession();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<any>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const userId = sessionStorage.getItem('id');
        if (userId) {
            fetch(`/api/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setValue('aboutMe', data.about);
                    setProfilePicture(data.profileImage);
                    setUserDetails(data);
                    setIsLoading(false);
                });
        }
    }, [setValue]);

    const onSubmit = (data: ProfileFormData) => {
        setIsLoading(true);
        console.log(data);
        const userId = sessionStorage.getItem('id');
        if (userId) {
            fetch(`/api/modify-user/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, userId }),
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                    setIsLoading(false);
                });
        }
        setIsLoading(false);
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
    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
            </div>
          );
    }
    else{
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
    
                                <Button type="submit" className="mt-4">Save</Button>
                            </form>
                            {userDetails && (
                                <div className="mt-8 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <p className="text-lg">{userDetails?.fullName}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Date of Birth</Label>
                                            <p className="text-lg">
                                                {userDetails?.dob ? new Date(userDetails.dob).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : ''}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Height</Label>
                                            <p className="text-lg">{userDetails?.height}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Gender</Label>
                                            <p className="text-lg">{userDetails?.gender}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mother Tongue</Label>
                                            <p className="text-lg">{userDetails?.motherTongue}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Religion</Label>
                                            <p className="text-lg">{userDetails?.religion}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Marital Status</Label>
                                            <p className="text-lg">{userDetails?.maritalStatus}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Education</Label>
                                            <p className="text-lg">{userDetails?.education}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Occupation</Label>
                                            <p className="text-lg">{userDetails?.occupation}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Annual Income</Label>
                                            <p className="text-lg">{userDetails?.income}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <Label className="text-lg font-serif text-red-600">Interests</Label>
                                        <p className="text-lg">{userDetails?.interests.join(', ')}</p>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-6">Partner Preferences</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Gender</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.gender}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Age Range</Label>
                                            <p className="text-lg">{`${userDetails?.partnerPreferences?.ageRangeFrom} - ${userDetails?.partnerPreferences?.ageRangeTo}`}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Height Range</Label>
                                            <p className="text-lg">{`${userDetails?.partnerPreferences?.heightRangeFrom} - ${userDetails?.partnerPreferences?.heightRangeTo}`}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Religion</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.religion}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mother Tongue</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.motherTongue}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Marital Status</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.maritalStatus}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Education</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.education}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Occupation</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.occupation}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Annual Income</Label>
                                            <p className="text-lg">{userDetails?.partnerPreferences?.income}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <p className="text-gray-500 text-sm">Make sure to fill all the required fields.</p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </>
        );
    };

    }

    

export default ProfilePage;
