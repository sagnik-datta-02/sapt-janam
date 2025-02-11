'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHeart, FaUser, FaUserFriends } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false); 

  useEffect(() => {
    if (status === 'unauthenticated' && sessionStorage.getItem('id') === null) {
      router.push('/sign-in');
    } else if (status === 'authenticated') {
      const email = session?.user?.email;
      if (email) {
        fetch('/api/get-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.id) {
              sessionStorage.setItem('id', data.id);
              
            }
          })
          .catch((error) => console.error('Error:', error));
      }
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {!hasProfile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Complete Your Profile</AlertTitle>
                <AlertDescription>
                  Please complete your profile to access all features.
                  <Button 
                    variant="link" 
                    className="text-red-600 pl-2"
                    onClick={() => router.push('/create-profile')}
                  >
                    Complete Now →
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif text-center text-red-600 mb-8">
              Welcome to Your Love Journey ✨
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <FaUser className="h-12 w-12 text-red-500" />
                      <h2 className="text-2xl font-semibold text-red-600">Your Profile</h2>
                      <p className="text-gray-600">
                        View and edit your profile details. Make sure your profile stands out
                        to attract the perfect match.
                      </p>
                      <Button 
                        onClick={() => router.push('/dashboard/profile')}
                        className="bg-red-500 hover:bg-red-600 transition-all w-full mt-4"
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <FaUserFriends className="h-12 w-12 text-red-500" />
                      <h2 className="text-2xl font-semibold text-red-600">Your Matches</h2>
                      <p className="text-gray-600">
                        Discover potential partners who share your interests and values.
                        Your perfect match might be just a click away!
                      </p>
                      <Button 
                        onClick={() => router.push('/dashboard/matches')}
                        className="bg-red-500 hover:bg-red-600 transition-all w-full mt-4"
                      >
                        Explore Matches
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;