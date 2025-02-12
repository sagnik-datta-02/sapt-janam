'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Match {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  fullName: string;
  dob: Date;
  height: string;
  motherTongue: string;
  religion: string;
  maritalStatus: string;
  gender: string;
  income: string;
  education: string;
  occupation: string;
  about: string;
  interests: string[];
  partnerPreferences: {
    gender: string;
    ageRangeFrom: number;
    ageRangeTo: number;
    heightRangeFrom: string;
    heightRangeTo: string;
    religion: string;
    motherTongue: string;
    maritalStatus: string;
    education: string;
    occupation: string;
    income: string;
  };
}

const MatchesPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  const fetchMatches = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/users`);
    const data = await response.json();
    setMatches(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session || sessionStorage.getItem('id')) {
      fetchMatches();
    }
  }, []);

  const handleViewMore = (match: Match) => {
    setSelectedMatch(match);
  };

  const closeModal = () => {
    setSelectedMatch(null);
  };

  const matchesPerPage = 10;
  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const currentMatches = matches.slice((page - 1) * matchesPerPage, page * matchesPerPage);
  if(isLoading) {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <FaHeart className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Discover Your Perfect Match?
            </h1>
            <p className="text-lg text-gray-600">
              Find someone who shares your values and dreams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentMatches.map((match, index) => (
              <motion.div
                key={match?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={match?.profileImage}
                        alt={match?.name}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{match?.name}</h3>
                        <p className="text-sm opacity-90">{new Date().getFullYear() - new Date(match?.dob).getFullYear()} years</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{match?.religion}</Badge>
                        <Badge variant="secondary">{match?.occupation}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {match?.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                            View Profile
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogTitle className="text-2xl font-serif mb-4">
                            {match?.fullName}
                          </DialogTitle>
                          <ScrollArea className="max-h-[80vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <img
                                  src={match?.profileImage}
                                  alt={match?.name}
                                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                                />
                              </div>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-lg">Personal Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-gray-500">Age</span>
                                    <span>{new Date().getFullYear() - new Date(match?.dob).getFullYear()} years</span>
                                    <span className="text-gray-500">Height</span>
                                    <span>{match?.height}</span>
                                    <span className="text-gray-500">Religion</span>
                                    <span>{match?.religion}</span>
                                    <span className="text-gray-500">Mother Tongue</span>
                                    <span>{match?.motherTongue}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-lg">Professional Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-gray-500">Occupation</span>
                                    <span>{match?.occupation}</span>
                                    <span className="text-gray-500">Education</span>
                                    <span>{match?.education}</span>
                                    <span className="text-gray-500">Income</span>
                                    <span>{match?.income}</span>
                                  </div>

                              </div>
                            </div>
                            <div className="mt-6">
                              <h4 className="font-semibold text-lg mb-3">About Me</h4>
                              <p className="text-gray-600">{match?.about}</p>
                            </div>
                            <div className="mt-6">
                              <h4 className="font-semibold text-lg mb-3">Interests</h4>
                              <div className="flex flex-wrap gap-2">
                                {match.interests.map((interest : string, i: number) => (
                                  <Badge key={i} variant="outline">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-lg mb-3">Partner Preferences</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-gray-500">
                                        Looking For
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.gender}
                                    </span>
                                    <span className="text-gray-500">
                                        Age Range
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.ageRangeFrom} - {match?.partnerPreferences?.ageRangeTo} years
                                    </span>
                                    <span className="text-gray-500">
                                        Height Range
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.heightRangeFrom} - {match?.partnerPreferences?.heightRangeTo}
                                    </span>
                                    <span className="text-gray-500">
                                        Religion
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.religion}
                                    </span>
                                    <span className="text-gray-500">
                                        Mother Tongue
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.motherTongue}
                                    </span>
                                    <span className="text-gray-500">
                                        Marital Status
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.maritalStatus}
                                    </span>
                                    <span className="text-gray-500">
                                        Education
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.education}
                                    </span>
                                    <span className="text-gray-500">
                                        Occupation
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.occupation}
                                    </span>
                                    <span className="text-gray-500">
                                        Income
                                    </span>
                                    <span>
                                        {match?.partnerPreferences?.income}
                                    </span>
                                </div>
                            </div>
                            </div>

                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
};

export default MatchesPage;