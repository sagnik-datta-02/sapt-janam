'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' && sessionStorage.getItem('id') === null) {
      router.push('/sign-in');
    } else if (status === 'authenticated') {
      const email = session?.user?.email;
      if (email) {
        fetch('/api/get-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('User ID:', data);
            if (data.id) {
              sessionStorage.setItem('id', data.id);
            }
          })
          .catch((error) => {
            console.error('Error fetching user ID:', error);
          });
      }
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8 px-4"
      >
        <div className="dashboard max-w-4xl mx-auto border-red-100 shadow-xl p-6 bg-white rounded-lg shadow-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <FaHeart className="h-12 w-12 text-red-500" />
          </motion.div>
          <h1 className="text-3xl font-serif text-center text-red-600">Welcome to your Dashboard</h1>
          <div className="flex flex-col items-center space-y-4 mt-6">
            <Button onClick={() => router.push('/dashboard/profile')} className="bg-red-500 hover:bg-red-600">
              Go to Profile
            </Button>
            <Button onClick={() => router.push('/dashboard/matches')} className="bg-red-500 hover:bg-red-600">
              Go to Matches
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;