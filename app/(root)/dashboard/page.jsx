'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mountain,
  Calendar,
  MapPin,
  Plus,
  Compass,Trophy,X
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isLoading, setIsLoading] = useState(false);
  const [claimedAchievements, setClaimedAchievements] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          router.push('/');
          return;
        }

        if (!user) {
          setTimeout(() => {
            setEvents(dummyEvents);
            setLoading(false);
          }, 1000);
          return;
        }

        const res = await fetch(`/api/trips?userId=${user._id}`);
        const data = await res.json();
        setEvents(data.data);
        console.log("Fetched tripssssssss:", data.data); // Print to server console

        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(dummyEvents);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [achievements, setAchievements] = useState([]);


  const fetchAchievements = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tripId = localStorage.getItem("tripId");
      console.log("Test ");
      setIsLoading(true);
      console.log(isLoading + " isLoading");
      
      const res = await fetch('/api/achievements');
      const data = await res.json();
      // const claimed = (data.userAchievements || [])
      // .filter((ua) => ua.claimed)
      // .map((ua) => ua.achievementId);
      console.log("Achievements fetched:", data);
      setAchievements(data.achievements); // Save to state;
      // setClaimedAchievements(claimed); // Save claimed achievements to state
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally{
      setIsLoading(false);
    }

  }
  // const fetchClaimedAchievements = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const tripId = localStorage.getItem("tripId");
  
  //   if (!user || !tripId) return;
  
  //   const res = await fetch(`/api/userAchievements?userId=${user._id}&tripId=${tripId}`);
  //   const data = await res.json();
  
  //   const claimed = data.userAchievements
  //     .filter((ua) => ua.claimed)
  //     .map((ua) => ua.achievementId);
  
  //   setClaimedAchievements(claimed);
  // };

  const handleClaim = async (achievementId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tripId = localStorage.getItem("tripId"); // Or however you're tracking current trip
  
      if (!user) {   //|| !tripId
        console.warn("Missing user or trip ID");
        return;
      }
  
      const res = await fetch("/api/userAchievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          tripId,
          achievementId,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setClaimedAchievements((prev) => [...prev, achievementId]); // Update claimed achievements state
        // Optionally refresh UI or disable the button
      } else {
        console.warn("Already claimed or error:", data.message);
      }
    } catch (error) {
      console.error("Error claiming achievement:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 blur-3xl animate-float2"></div>
      </div>

      <header className="w-full p-6 flex items-center justify-between bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg border-b border-[#334155]/50 relative z-10">
        <div className="flex items-center">
          <Mountain className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mr-2" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">BackpackBuddy</h1>
        </div>
        <div className="flex space-x-6">
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors">Dashboard</button>
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors">My Trips</button>
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors">Profile</button>
          {/* Circular Achievements Button */}
          <button
            onClick={() => {
              fetchAchievements();
              setIsModalOpen(true)
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] flex items-center justify-center hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30"
          >
            <Trophy className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl shadow-md border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] transform hover:-translate-y-1">
            <div className="flex items-center mb-2">
              <Compass className="h-6 w-6 text-[#818CF8] mr-3" />
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Upcoming Trips</h3>
            </div>
            <p className="text-4xl font-bold text-[#CBD5E1]">{events.length}</p>
          </div>
          <div className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl shadow-md border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] transform hover:-translate-y-1">
            <div className="flex items-center mb-2">
              <Calendar className="h-6 w-6 text-[#818CF8] mr-3" />
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Next Trip</h3>
            </div>
            <p className="text-lg text-[#CBD5E1]">{events[0]?.date || 'No trips scheduled'}</p>
          </div>
          <div className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl shadow-md border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] transform hover:-translate-y-1">
            <div className="flex items-center mb-2">
              <MapPin className="h-6 w-6 text-[#818CF8] mr-3" />
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Popular Destination</h3>
            </div>
            <p className="text-lg">{events[0]?.location || 'Not available'}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Upcoming Trips and Events</h2>
          <Link href="/dashboard/createnew">
            <button className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30 transition-all duration-500">
              <Plus className="h-5 w-5 mr-2" />
              <span>Create Trip</span>
            </button>
          </Link>
        </div>
        {/* <button onClick={()=>fetchAchievements()}>ACIEVEMENTS</button> */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 rounded-xl h-24 border border-[#334155]/50"></div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link href={`/trip/${event._id}`} key={event._id}>
                <div className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-4 rounded-xl shadow-md border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] transform hover:-translate-y-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">{event.title}</h3>
                      <div className="mt-2 text-sm text-[#CBD5E1]">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-[#818CF8]" />
                          <span>
                          {event.startDate
                              ? new Date(event.startDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Date not specified"}
                            {event.endDate
                              ? " - " +
                                new Date(event.endDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                        {event.destination && (
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-[#818CF8]" />
                            <span>{event.destination}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#334155]/50 p-2 rounded-full">
                      <ArrowRight className="h-6 w-6 text-[#818CF8]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-8 rounded-xl text-center border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)]">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-2">No upcoming trips</h3>
            <p className="text-[#CBD5E1] mb-4">Start planning your next adventure!</p>
            <Link href="/create-trip">
              <button className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] text-white px-6 py-3 rounded-xl flex items-center mx-auto transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30">
                <Plus className="h-5 w-5 mr-2" />
                <span>Create Your First Trip</span>
              </button>
            </Link>
          </div>
        )}
      </main>
      <div>


      {/* <div className="grid grid-cols-2 gap-4 mt-4">
        {achievements && achievements.map((achievement) => (
          <div key={achievement._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{achievement.title}</h3>
            <div className="text-sm text-gray-600">{achievement.rewardValue}</div>
          </div>
        ))}
      </div> */}
    </div>
      <footer className="w-full p-6 mt-12 bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg border-t border-[#334155]/50 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Mountain className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mr-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-bold">BackpackBuddy</span>
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] text-sm animate-text-pulse">
            © {new Date().getFullYear()} BackpackBuddy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* New Modal with Uploaded Image Layout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl border-4 border-gradient-to-r from-[#4F46E5]/50 via-[#6366F1]/50 to-[#8B5CF6]/50 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false)
              }}
              className="absolute top-4 right-4 text-[#CBD5E1] hover:text-[#818 CF8] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-2 text-center">
              Achievements
            </h2>
            <div className="flex flex-col space-y-4">
            {isLoading ? (
              <div className="text-center text-white">Loading achievements...</div>
            ) : (
              achievements?.map((achievement) => (
                <div
                  key={achievement._id}
                  className="flex items-center justify-between bg-[#2A3448]/80 px-4 py-3 rounded-xl shadow-md"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#4A6FA5] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-[#CBD5E1] font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-400">{achievement.rewardValue}</p>
                    </div>
                  </div>
                  {/* <button
                    className="bg-[#6B7280] text-white px-4 py-1.5 rounded-full hover:bg-[#4B5563] transition-colors text-sm"
                    onClick={() => handleClaim(achievement._id)}
                  >
                    Claim
                  </button> */}
                  <button
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    claimedAchievements.includes(achievement._id)
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-[#6B7280] text-white hover:bg-[#4B5563]"
                  }`}
                  disabled={claimedAchievements.includes(achievement._id)}
                  onClick={() => handleClaim(achievement._id)}
                >
                  {claimedAchievements.includes(achievement._id) ? "Claimed" : "Claim"}
                </button>
                </div>
              ))
            )}
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -20px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, 25px) rotate(-3deg); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-float1 { animation: float1 18s ease-in-out infinite; }
        .animate-float2 { animation: float2 20s ease-in-out infinite; }
        .animate-text-pulse { animation: text-pulse 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

const dummyEvents = [
  {
    _id: 'TR1001',
    title: 'Rocky Mountain Expedition',
    date: 'May 15 - May 22, 2025',
    location: 'Colorado, USA',
    description: 'Experience the majestic beauty of the Rocky Mountains with guided hiking tours.'
  },
  {
    _id: 'TR1002',
    title: 'Coastal Paradise Getaway',
    date: 'June 10 - June 17, 2025',
    location: 'Bali, Indonesia',
    description: 'Relax on pristine beaches and explore ancient temples in this tropical paradise.'
  },
  {
    _id: 'TR1003',
    title: 'European Cultural Tour',
    date: 'July 5 - July 19, 2025',
    location: 'Paris, France',
    description: 'Immerse yourself in European culture, art, and cuisine with guided tours.'
  }
];