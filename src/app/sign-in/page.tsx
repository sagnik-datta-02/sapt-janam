"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInValues = z.infer<typeof signInSchema>

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInValues) => {
        setIsLoading(true);
        try {
            console.log(data)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignIn = () => {
        console.log("Google Sign In")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md  border-red-100 shadow-xl  bg-white/90">
                    <CardHeader className="space-y-1">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center mb-4"
                        >
                            <FaHeart className="h-12 w-12 text-red-500" />
                        </motion.div>
                        <CardTitle className="text-3xl text-center font-serif text-red-600">
                            Welcome Back! ✨
                        </CardTitle>
                        <CardDescription className="text-center text-red-400 text-lg">
                            Your perfect match awaits you 💝
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="email" className="text-red-700">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="✉️ Enter your email"
                                    className="border-red-100 focus:border-red-300 focus:ring-red-200 text-lg py-6"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="password" className="text-red-700">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="🔒 Enter your password"
                                    className="border-red-100 focus:border-red-300 focus:ring-red-200 text-lg py-6"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <Button 
                                    type="submit" 
                                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing In..." : "Continue Your Journey 💫"}
                                </Button>
                            </motion.div>
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-red-100" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-red-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full border-red-100 hover:bg-red-50 text-lg py-6"
                                    onClick={handleGoogleSignIn}
                                >
                                    <FcGoogle className="mr-2 h-6 w-6" />
                                    Sign in with Google
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}