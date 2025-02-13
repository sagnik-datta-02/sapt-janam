'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const router = useRouter();
  useEffect(() => {
    if (session || sessionStorage.getItem('id')) {
      setIsLoggedIn(true);
    }
  }, [session]);

  return (
    <Card className="w-[100%] rounded-none bg-red-500 pb-4 px-6 border-0 flex items-center justify-between gap-6 shadow-md">
      <div className="text-primary cursor-pointer transition-transform duration-300 hover:scale-105">
        <Link href="/">
          <Image
            src="/erasebg-transformed.webp"
            alt="Sapt Janam"
            className="h-16 w-full"
            width={100}
            height={50}
          />
        </Link>
      </div>

      {/* <ul className="hidden md:flex items-center gap-10 text-white">
        {["Home", "Why Us?", "Success Stories", "Contact"].map(
          (item) => (
            <li key={item} className="relative group">
              <a
                href={item.toLowerCase() === "home" ? "#" : `#${item.toLowerCase()}`}
                className="font-medium transition-colors duration-300 hover:text-gray-100"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          )
        )}
      </ul> */}

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="transition-colors duration-300 hover:bg-red-600 hover:border-white"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 transition-all duration-300 bg-red-500 border-red-400"
            >
              <DropdownMenuItem
                className="transition-colors duration-300 hover:bg-red-950/50 text-gray-100"
                onClick={() => {router.push('/dashboard')}}
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem disabled
                className="transition-colors duration-300 hover:bg-red-950/50 text-gray-100"
              >
                Help
              </DropdownMenuItem>
              <DropdownMenuItem disabled
                className="transition-colors duration-300 hover:bg-red-950/50 text-gray-100"
              >
                Settings
              </DropdownMenuItem>
                <DropdownMenuItem
                className="transition-colors duration-300 hover:bg-red-950/50 text-gray-100"
                onClick={() => {
                  sessionStorage.removeItem('id');
                  signOut({ callbackUrl: '/' });
                }}
                >
                Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              variant="outline"
              className="hidden md:block transition-all duration-300 border-white text-red-500 hover:bg-red-200 hover:border-white"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </>
        )}
        {!isLoggedIn && (
        <div className="flex md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="transition-colors duration-300 hover:bg-red-600 hover:border-white"
              >
                <Menu className="h-5 w-5 rotate-0 scale-100 text-black" />
              </Button>
            </DropdownMenuTrigger>
            
               <DropdownMenuContent
               align="end"
               className="w-56 transition-all duration-300 bg-red-500 border-red-400"
             >
                  <DropdownMenuItem className="text-white hover:bg-red-950/50">
                     <Link href="/sign-up" className="w-full">
                       Find Your Soulmate
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem className="text-white hover:bg-red-950/50">
                     <Link href="/sign-in" className="w-full">
                       Sign In
                     </Link>
                   </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
        </div>
        )}
      </div>
    </Card>
  );
};

export default Navbar;