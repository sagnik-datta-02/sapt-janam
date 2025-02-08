"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TypeAnimation } from 'react-type-animation';
import WorldMap from "@/components/ui/world-map";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden lg:h-screen bg-gradient-to-b from-red-50 to-white">
            <div className="absolute w-full h-full top-[-0.5rem] md:top-0 md:transform-none opacity-75">
                <WorldMap
                dots={[
                    {
                      start: {
                      lat: 64.2008,
                      lng: -149.4937,
                      }, // Alaska (Fairbanks)
                      end: {
                      lat: 34.0522,
                      lng: -118.2437,
                      }, // Los Angeles
                    },
                    {
                      start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                      end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                    },
                    {
                      start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                    },
                    {
                      start: { lat: 51.5074, lng: -0.1278 }, // London
                      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                    },
                    
                        // {
                        //     start: { lat: 20.5937, lng: 78.9629 }, // India
                        //     end: { lat: 40.7128, lng: -74.0060 }, // New York
                        // },
                        // {
                        //     start: { lat: 51.5074, lng: -0.1278 }, // London
                        //     end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        // },
                        // {
                        //     start: { lat: 1.3521, lng: 103.8198 }, // Singapore
                        //     end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        // },
                        // {
                        //     start: { lat: -33.8688, lng: 151.2093 }, // Sydney
                        //     end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        // },
                    ]}
                    lineColor="#FF6B6B"
                />
            </div>
            
            <div className="relative top-8 lg:top-0 z-10 lg:h-[100vh] flex flex-col items-center justify-center">
                <div className="text-center">
                    {/* <motion.h1
                        className="py-2 text-xl md:text-3xl lg:text-6xl font-serif font-bold text-red-800 tracking-wide"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Welcome to
                    </motion.h1> */}
                    <motion.h2
                        className="text-2xl md:text-4xl lg:text-7xl font-serif font-extrabold text-red-600 mt-2 tracking-tight"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                        Sapt Janm
                    </motion.h2>
                    <motion.p
                        className="text-base font-bold md:text-2xl lg:text-4xl font-serif text-red-700 max-w-2xl mx-auto py-4 leading-relaxed"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    >
                        Connecting ❤️ Across The World
                    </motion.p>
                </div>

                <TypeAnimation
                    sequence={[
                        "Find Your Soulmate",
                        2000,
                        "Begin Your Journey",
                        2000,
                        "Create Your Story",
                        2000,
                        "Discover Love",
                        2000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    className="text-xl font-serif md:text-3xl lg:text-5xl text-red-500"
                />

                <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <Link href="/sign-up">
                        <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-red-600 text-white rounded-full text-sm md:text-base lg:text-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Begin Your Journey Now ✨
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
