'use client'    
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaHeart } from "react-icons/fa6"; // Changed to heart icon for matchmaking theme

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Found perfect match",
        image: "/avatars/priya.jpg",
        comment: "SaptJanam's AI matching system understood exactly what I was looking for in a life partner. I'm grateful for this platform!",
        rating: 5
    },
    {
        name: "Rahul Verma",
        role: "Happily Married",
        image: "/avatars/rahul.jpg",
        comment: "The compatibility matching on SaptJanam is incredible. The AI suggested matches were so accurate, I met my wife here!",
        rating: 5
    },
    {
        name: "Anjali Patel",
        role: "Successfully Matched",
        image: "/avatars/anjali.jpg",
        comment: "What sets SaptJanam apart is how it considers cultural values alongside modern expectations. Truly revolutionary!",
        rating: 5
    },
    {
        name: "Amit Singh",
        role: "In Love",
        image: "/avatars/amit.jpg",
        comment: "I was skeptical about online matchmaking, but SaptJanam proved me wrong. I found my soulmate here!",
        rating: 5
    },
    {
        name: "Neha Gupta",
        role: "Engaged",
        image: "/avatars/neha.jpg",
        comment: "The personalized recommendations on SaptJanam are so thoughtful. I'm excited to start this new chapter of my life!",
        rating: 5
    }
]

export default function Testimonials() {
    return (
        <section className="py-16 bg-gradient-to-br from-red-900 to-rose-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-300 to-red-400 bg-clip-text text-transparent">
                        Success Stories
                    </h2>
                    <p className="text-gray-200 mt-4">
                        Join thousands of happy couples who found their soulmates through our AI matchmaking
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <Card className="bg-rose-900/30 border-rose-700 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-12 w-12 ring-2 ring-rose-400">
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                                                <p className="text-sm text-rose-200">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaHeart key={i} className="h-4 w-4 text-rose-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-200 italic">"{testimonial.comment}"</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    )
}
