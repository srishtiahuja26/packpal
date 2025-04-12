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
  const typeOptions = ["a", "b", "c", "d", "f"]
  const categoryOptions = ["Trip", "Event"]

  // Update end date when start date changes
  useEffect(() => {
    const user = localStorage.getItem('user'); // Assuming you store user data in localStorage
      if (!user) {
        router.push('/signup'); // Redirect to dashboard if user is already logged in
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
        console.log(data)
        router.push(`/dashboard/${data.trip._id}`);
        // Optionally clear form or redirect
      } else {
        alert("Failed to create trip.");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };
  

  const handleAIGenerate = async () => {
    // const res = await fetch('/api/ai/generate-packing-list', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //   startDate,
    //   endDate,
    //   destination,
    //   selectedType,
    //   selectedCategory,
    //   }),
    // });
  
    // const data = await res.json();
    // if (data.success) {
    //   console.log('AI Suggestions:', data);
    //   // setSuggestedItems(data.items);
    // } else {
    //   alert('Failed to generate list');
    // }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/placeholder.svg?height=1080&width=1920)",
      }}
    >
      {/* Header */}
      <header className="w-full p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Mountain className="h-8 w-8 text-white mr-2" />
          <h1 className="text-2xl font-bold text-white">BackpackBuddy</h1>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-white hover:text-blue-300 transition-colors">Dashboard</button>
          <button className="px-4 py-2 text-white hover:text-blue-300 transition-colors">My Trips</button>
          <button className="px-4 py-2 text-white hover:text-blue-300 transition-colors">Profile</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Create New Trip</h2>
          <p className="text-gray-300 mb-8">Plan your next adventure with BackpackBuddy</p>

          <form
            onSubmit={handleCreateTrip}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Name */}
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-medium text-gray-200">Trip Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PenTool className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="Summer Hiking Adventure"
                    className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">Start Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">End Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || new Date().toISOString().split('T')[0]} // Can't be before start date
                    disabled={!startDate} // Disabled until start date is selected
                    className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-medium text-gray-200">Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Rocky Mountains, Colorado"
                    className="w-full p-3 pl-10 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">Trip Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTypeOpen(!typeOpen)}
                    className="flex items-center justify-between w-full p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <span>{selectedType || "Select Type"}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${typeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {typeOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-slate-800 border border-white/20 rounded-lg shadow-lg z-10">
                      {typeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedType(option)
                            setTypeOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors"
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
                <label className="block mb-2 text-sm font-medium text-gray-200">Trip Category</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="flex items-center justify-between w-full p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <span>{selectedCategory || "Select Category"}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                  </button>
                  {categoryOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-slate-800 border border-white/20 rounded-lg shadow-lg z-10">
                      {categoryOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedCategory(option)
                            setCategoryOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors"
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center group"
              >
                <span>Create Trip</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleAIGenerate}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                <span>AI Suggestions</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 mt-12 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Mountain className="h-6 w-6 text-white mr-2" />
            <span className="text-white font-bold">BackpackBuddy</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BackpackBuddy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}