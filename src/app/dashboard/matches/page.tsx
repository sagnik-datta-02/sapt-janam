'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';

interface Match {
  id: string;
  name: string;
  age: number;
  description: string;
  profileImage: string;
  fullName: string;
  dob: string;
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

  const fetchMatches = async () => {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    setMatches(data);
  };

  useEffect(() => {
    if (session) {
      fetchMatches();
    }
  }, [session]);

  const handleViewMore = (match: Match) => {
    setSelectedMatch(match);
  };

  const closeModal = () => {
    setSelectedMatch(null);
  };

  const matchesPerPage = 10;
  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const currentMatches = matches.slice((page - 1) * matchesPerPage, page * matchesPerPage);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8 px-4"
      >
        <div className="matches-page p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto border-red-100 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <FaHeart className="h-12 w-12 text-red-500" />
          </motion.div>
          <h2 className="text-3xl font-serif text-center text-red-600">My Matches</h2>
          <div className="matches-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMatches.map((match) => (
              <div key={match.id} className="match-card p-4 bg-gray-100 rounded-lg shadow-md">
                <img src={match.profileImage} alt={match.name} className="w-32 h-32 rounded-full mx-auto" />
                <h3 className="text-xl font-semibold mt-4">{match.name}</h3>
                <p className="text-gray-600">{match.age} years old</p>
                <p className="text-gray-600">{match.description}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button onClick={() => handleViewMore(match)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                      View More
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogClose asChild>
                      <button className="close-button" onClick={closeModal}>
                        <span aria-hidden>×</span>
                      </button>
                    </DialogClose>
                    {selectedMatch && (
                      <div className="modal-content">
                        <img src={selectedMatch.profileImage} alt={selectedMatch.name} className="w-32 h-32 rounded-full mx-auto" />
                        <h3 className="text-xl font-semibold mt-4">{selectedMatch.fullName}</h3>
                        <p className="text-gray-600">DOB: {new Date(selectedMatch.dob).toLocaleDateString()}</p>
                        <p className="text-gray-600">Height: {selectedMatch.height}</p>
                        <p className="text-gray-600">Mother Tongue: {selectedMatch.motherTongue}</p>
                        <p className="text-gray-600">Religion: {selectedMatch.religion}</p>
                        <p className="text-gray-600">Marital Status: {selectedMatch.maritalStatus}</p>
                        <p className="text-gray-600">Gender: {selectedMatch.gender}</p>
                        <p className="text-gray-600">Income: {selectedMatch.income}</p>
                        <p className="text-gray-600">Education: {selectedMatch.education}</p>
                        <p className="text-gray-600">Occupation: {selectedMatch.occupation}</p>
                        <p className="text-gray-600">About: {selectedMatch.about}</p>
                        <p className="text-gray-600">Interests: {selectedMatch.interests.join(', ')}</p>
                        <h4 className="text-lg font-semibold mt-4">Partner Preferences</h4>
                        <p className="text-gray-600">Gender: {selectedMatch.partnerPreferences.gender}</p>
                        <p className="text-gray-600">Age Range: {selectedMatch.partnerPreferences.ageRangeFrom} - {selectedMatch.partnerPreferences.ageRangeTo}</p>
                        <p className="text-gray-600">Height Range: {selectedMatch.partnerPreferences.heightRangeFrom} - {selectedMatch.partnerPreferences.heightRangeTo}</p>
                        <p className="text-gray-600">Religion: {selectedMatch.partnerPreferences.religion}</p>
                        <p className="text-gray-600">Mother Tongue: {selectedMatch.partnerPreferences.motherTongue}</p>
                        <p className="text-gray-600">Marital Status: {selectedMatch.partnerPreferences.maritalStatus}</p>
                        <p className="text-gray-600">Education: {selectedMatch.partnerPreferences.education}</p>
                        <p className="text-gray-600">Occupation: {selectedMatch.partnerPreferences.occupation}</p>
                        <p className="text-gray-600">Income: {selectedMatch.partnerPreferences.income}</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
          <div className="pagination mt-6 flex justify-between">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
              Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MatchesPage;