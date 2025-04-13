"use client"
import {  useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Mountain, Calendar, MapPin, PenTool, ChevronDown, Sparkles, ArrowRight } from "lucide-react"

export default function CreateTrip() {
  const router = useRouter();
  const [tripName, setTripName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [destination, setDestination] = useState("")
  const [typeOpen, setTypeOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const typeOptions = ["camping", "beach", "pilgrims"," hiking", "road trip", "cruise"]
  const categoryOptions = ["Trip", "Event"]

  // Update end date when start date changes
  useEffect(() => {
    const user = localStorage.getItem('user'); // Assuming you store user data in localStorage
      if (!user) {
        router.push('/'); // Redirect to dashboard if user is already logged in
      }
    if (startDate) {
      setEndDate(startDate) // Set end date to start date by default
    }
  }, [startDate])

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)
    
    // If end date is before new start date, update it
    if (endDate && endDate < newStartDate) {
      setEndDate(newStartDate)
    }
  }

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value
    // Only allow end dates that are equal to or after start date
    if (!startDate || newEndDate >= startDate) {
      setEndDate(newEndDate)
    }
  }

  const handleCreateTrip = async (e) => {
    e.preventDefault();
  
    // Get user ID from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?._id;
  
    if (!userId) {
      alert("User not found. Please log in again.");
      return;
    }
  
    const newTrip = {
      name : tripName,
        startDate: startDate,
        endDate: endDate,
        owner: userId,
        members: [],
      destination :destination,
      type: selectedType,
      category: selectedCategory,
    };
  
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrip),
      });
      const data = await res.json();
      if (res.status && data.success) {
        alert("Trip created successfully!");
        console.log(data);
        router.push(`/dashboard/${data.trip._id}`);
      } else {
        alert("Failed to create trip.");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const handleAIGenerate = async (e) => {


    e.preventDefault();
  
    // Get user ID from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?._id;
  
    if (!userId) {
      alert("User not found. Please log in again.");
      return;
    }
  
    const newTrip = {
      name : tripName,
        startDate: startDate,
        endDate: endDate,
        owner: userId,
        members: [],
      destination :destination,
      type: selectedType,
      category: selectedCategory,
    };
  
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrip),
      });
      const data = await res.json();
      if (res.status && data.success) {
        alert("Trip created successfully!");
        console.log(data);
        // router.push(`/dashboard/${data.trip._id}`);
        const response = await fetch("/api/geminiChecklist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination: destination,
            type: selectedType,
            category: selectedCategory,
            startDate: startDate,
            endDate: endDate,
          }),
        });
    
        const data1 = await response.json();
        let checklist = data1.checklist;
        console.log(checklist);
        if (typeof checklist === "string") {
          try {
            checklist = JSON.parse(checklist);
          } catch (e) {
            console.error("Failed to parse checklist:", e);
            alert("Checklist format error.");
            return;
          }
        }
        for (const category in checklist) {
          const itemsArray = checklist[category];
  
          for (const itemName of itemsArray) {
            const itemData = {
              name: itemName,
              category: category,
              tripId: data.trip._id,
              status: "to pack",
              assignedTo: "",
              // userRole: "",
            };
  
            const res = await fetch("/api/items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(itemData),
            });
            var dummy = await res.json();
            console.log(dummy);
          }
        }
        console.log("All AI-generated items saved to DB.");
        router.push(`/dashboard/${data.trip._id}`);
      } else {
        alert("Failed to create trip.");
      }

      
    } catch (error) {
      console.error("Error creating trip:", error);
    }
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 blur-3xl animate-float2"></div>
      </div>

      {/* Header */}
      <header className="w-full p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Mountain className="h-8 w-8 text-[#CBD5E1] mr-2" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            BackpackBuddy
          </h1>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors" onClick={()=>router.push('/dashboard')}>
            Dashboard
          </button>
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors" onClick={()=>router.push('/dashboard')}>
            My Trips
          </button>
          <button className="px-4 py-2 text-[#CBD5E1] hover:text-[#818CF8] transition-colors" onClick={()=>{
            localStorage.removeItem('user')
            router.push('/signup')
          }}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-2">
            Create New Trip
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] text-sm animate-text-pulse mb-8">
            Plan your next adventure with BackpackBuddy
          </p>

          <form
            onSubmit={handleCreateTrip}
            className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Name */}
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  Trip Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PenTool className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="Summer Hiking Adventure"
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
                    required
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
                    required
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    disabled={!startDate}
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B] disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Rocky Mountains, Colorado"
                    className="w-full p-3 pl-10 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
                    required
                  />
                </div>
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  Trip Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTypeOpen(!typeOpen)}
                    className="flex items-center justify-between w-full p-3 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50"
                  >
                    <span>{selectedType || "Select Type"}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#64748B] transition-transform ${typeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {typeOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-[#1E293B] border border-[#334155] rounded-xl shadow-lg z-10">
                      {typeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedType(option);
                            setTypeOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-[#CBD5E1] hover:bg-[#334155] rounded-lg transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[#CBD5E1]">
                  Trip Category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="flex items-center justify-between w-full p-3 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50"
                  >
                    <span>{selectedCategory || "Select Category"}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#64748B] transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {categoryOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-[#1E293B] border border-[#334155] rounded-xl shadow-lg z-10">
                      {categoryOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedCategory(option);
                            setCategoryOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-[#CBD5E1] hover:bg-[#334155] rounded-lg transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white py-3 px-6 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30 flex items-center justify-center group"
              >
                <span>Create Trip</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleAIGenerate}
                className="flex-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white py-3 px-6 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30 flex items-center justify-center"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                <span>AI Suggestions</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 mt-12 bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Mountain className="h-6 w-6 text-[#CBD5E1] mr-2" />
            <span className="text-[#CBD5E1] font-bold">BackpackBuddy</span>
          </div>
          <div className="text-[#CBD5E1] text-sm">
            © {new Date().getFullYear()} BackpackBuddy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-30px, -20px) rotate(3deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(25px, 25px) rotate(-3deg);
          }
        }
        @keyframes text-pulse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-float1 {
          animation: float1 18s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 20s ease-in-out infinite;
        }
        .animate-text-pulse {
          animation: text-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}