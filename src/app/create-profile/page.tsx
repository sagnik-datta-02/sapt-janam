'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCamera } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const userSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    dob: z.string().min(1, "Date of birth is required"),
    height: z.string().min(1, "Height is required"),
    motherTongue: z.string().min(1, "Mother tongue is required"),
    religion: z.string().min(1, "Religion is required"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    gender: z.string().min(1, "Gender is required"),
    income: z.string().min(1, "Income is required"),
    education: z.string().min(1, "Education is required"),
    occupation: z.string().min(1, "Occupation is required"),
    about: z.string().min(20, "About section must be at least 20 characters"),
    interests: z.array(z.string()).min(1, "Select at least one interest"),
    profileImage: z.string().optional(),
    partnerPreferences: z.object({
        gender: z.string().min(1, "Gender is required"),
        ageRange: z.object({
            from: z.string().min(1, "Age from is required"),
            to: z.string().min(1, "Age to is required"),
        }),
        heightRange: z.object({
            from: z.string().min(1, "Height from is required"),
            to: z.string().min(1, "Height to is required"),
        }),
        
        religion: z.string().min(1, "Religion is required"),
        motherTongue: z.string().min(1, "Mother tongue is required"),
        maritalStatus: z.string().min(1, "Marital status is required"),
        education: z.string().min(1, "Education is required"),
        occupation: z.string().min(1, "Occupation is required"),
        income: z.string().min(1, "Income is required"),
    }).optional()
});

type UserFormData = z.infer<typeof userSchema>;

const CreateProfile = () => {
    const [step, setStep] = useState(1);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [direction, setDirection] = useState(0);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const Router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const interests = [
        "Travel", "Reading", "Music", "Cooking", "Fitness",
        "Photography", "Art", "Dance", "Movies", "Sports",
        "Yoga", "Adventure", "Food", "Technology", "Nature"
    ];

    const toggleInterest = (interest: string) => {
        const newInterests = selectedInterests.includes(interest)
            ? selectedInterests.filter(i => i !== interest)
            : [...selectedInterests, interest];
        setSelectedInterests(newInterests);
        setValue('interests', newInterests);
    };

    useEffect(() => {
        const checkAuthToken = async () => {
            
           
            if (email) {
                try {
                    const response = await fetch('/api/get-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        }, 
                        body: JSON.stringify({ email }),
                    });
                    if (!response.ok) throw new Error('Failed to fetch user');
                    const result = await response.json();
                    sessionStorage.setItem('id', result.id);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        checkAuthToken();
    }, []);

    const onSubmit = async (data: UserFormData) => {
        setIsLoading(true);
        const userId = sessionStorage.getItem('id');
        if (!userId) {
            console.error('User ID not found in session storage');
        setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, profileImage, id: userId }),
            });
            if (!response.ok) throw new Error('Profile creation failed');
            const result = await response.json();
            console.log(result);
            setIsLoading(false);
            Router.push('/dashboard');
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        setDirection(1);
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8 px-4">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                            Let's Create Your Perfect Profile ✨
                        </CardTitle>
                        <div className="flex justify-center space-x-2 mt-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${step === i ? 'bg-red-500' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    {step === 1 && (
                                        <div className="space-y-4">
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
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <div className="grid gap-4">
                                                <Label className="text-lg font-serif text-red-600">About You</Label>
                                                <Textarea
                                                    {...register('about')}
                                                    placeholder="Tell us about yourself..."
                                                    className="min-h-[150px]"
                                                />
                                                {errors.about && (
                                                    <p className="text-red-500 text-sm">{errors.about.message}</p>
                                                )}

                                                <Label className="text-lg font-serif text-red-600">Your Interests</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {interests.map((interest) => (
                                                        <motion.div
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            key={interest}
                                                        >
                                                            <Badge
                                                                className={`cursor-pointer ${selectedInterests.includes(interest)
                                                                    ? 'bg-red-500'
                                                                    : 'bg-gray-200 text-gray-700'
                                                                    }`}
                                                                onClick={() => toggleInterest(interest)}
                                                            >
                                                                {interest}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                {errors.interests && (
                                                    <p className="text-red-500 text-sm">{errors.interests.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <div className="flex flex-col items-center gap-6">
                                                <Label className="text-2xl font-serif text-red-600">Add Your Best Photo</Label>
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="relative group"
                                                >
                                                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-red-200 shadow-lg hover:border-red-300 transition-all duration-300">
                                                        {profileImage ? (
                                                            <Image
                                                                src={profileImage}
                                                                alt="Profile"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                className="hover:scale-110 transition-transform duration-300"
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
                                                                    onClick={() => document.getElementById('profileImage')?.click()}
                                                                >
                                                                    {profileImage ? 'Change Photo' : 'Upload Photo'}
                                                                </Button>
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                                {profileImage && (
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
                                                    id="profileImage"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                const result = reader.result as string;
                                                                setProfileImage(result);
                                                                setValue('profileImage', result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Partner's Preferred Age Range</Label>
                                                    <div  className="flex gap-4">
                                                        <Select onValueChange={(value) => setValue('partnerPreferences.ageRange.from', value)}>
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

                                                        <Select onValueChange={(value) => setValue('partnerPreferences.ageRange.to', value)}>
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
                                                    {errors.partnerPreferences?.ageRange && (
                                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.ageRange.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Partner's Preferred Height Range</Label>
                                                    <div className="flex gap-4">
                                                        <Select onValueChange={(value) => setValue('partnerPreferences.heightRange.from', value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="From" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[200px] overflow-y-auto">
                                                                {Array.from({ length: 37 }, (_, i) => {
                                                                    const feet = Math.floor((48 + i) / 12);
                                                                    const inches = (48 + i) % 12;
                                                                    const heightStr = `${feet}' ${inches}"`;
                                                                    return (
                                                                        <SelectItem 
                                                                            key={i} 
                                                                            value={heightStr}
                                                                        >
                                                                            {heightStr}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select onValueChange={(value) => setValue('partnerPreferences.heightRange.to', value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="To" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[200px] overflow-y-auto">
                                                                {Array.from({ length: 37 }, (_, i) => {
                                                                    const feet = Math.floor((48 + i) / 12);
                                                                    const inches = (48 + i) % 12;
                                                                    const heightStr = `${feet}' ${inches}"`;
                                                                    return (
                                                                        <SelectItem 
                                                                            key={i} 
                                                                            value={heightStr}
                                                                        >
                                                                            {heightStr}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                        </div>
                                                    
                                                    {errors.partnerPreferences?.heightRange && (
                                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.heightRange.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Partner's Preferred Gender</Label>
                                                    <Select onValueChange={(value) => setValue('partnerPreferences.gender', value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Select Gender' />
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
                                                    <Label>Partner's Preferred Religion</Label>
                                                    <Select onValueChange={(value) => setValue('partnerPreferences.religion', value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select religion" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="hindu">Hindu</SelectItem>
                                                            <SelectItem value="muslim">Muslim</SelectItem>
                                                            <SelectItem value="sikh">Sikh</SelectItem>
                                                            <SelectItem value="christian">Christian</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.partnerPreferences?.religion && (
                                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.religion.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Partner's Preferred Mother Tongue</Label>
                                                    <Select onValueChange={(value) => setValue('partnerPreferences.motherTongue', value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="hindi">Hindi</SelectItem>
                                                            <SelectItem value="english">English</SelectItem>
                                                            <SelectItem value="punjabi">Punjabi</SelectItem>
                                                            <SelectItem value="gujarati">Gujarati</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.partnerPreferences?.motherTongue && (
                                                        <p className="text-red-500 text-sm">{errors.partnerPreferences.motherTongue.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Partner's Preferred Marital Status</Label>
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
                                                    <Label>Partner's Preferred Education</Label>
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
                                                    <Label>Partner's Preferred Occupation</Label>
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
                                                    <Label>Partner's Annual Income</Label>
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
                                                    {errors.income && (
                                                        <p className="text-red-500 text-sm">{errors.income.message}</p>
                                                    )}
                                                    </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between pt-4">
                                        {step > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        {step < 4 ? (
                                            <Button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-600 ml-auto"
                                                onClick={async () => {
                                                    if (step === 1) {
                                                        const result = await trigger([
                                                            'fullName',
                                                            'dob',
                                                            'height',
                                                            'motherTongue',
                                                            'religion',
                                                            'maritalStatus',
                                                            'education',
                                                            'occupation',
                                                            'gender',
                                                            'income',
                                                        ]);
                                                        if (result) nextStep();
                                                    } else if (step === 2) {
                                                        const result = await trigger(['about', 'interests']);
                                                        if (result) nextStep();
                                                    } else if (step === 3) {
                                                        nextStep();
                                                    }
                                                }}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleSubmit(onSubmit)}
                                                type="button"
                                                className="bg-red-500 hover:bg-red-600 ml-auto"
                                            >
                                               {isLoading? 'Profile Uploading !':'Complete Profile'} 
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card >
            </motion.div >
        </div >
    );
};

export default CreateProfile;
