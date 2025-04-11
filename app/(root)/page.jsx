'use client';

import { ArrowRight, Mountain, Menu, X } from 'lucide-react';
import { useState } from 'react';
import {  useRouter } from "next/navigation"
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Mountain className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">BackpackBuddy</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {/* <a href="#" className="text-white hover:text-gray-200">Destinations</a>
                <a href="#" className="text-white hover:text-gray-200">About</a>
                <a href="#" className="text-white hover:text-gray-200">Community</a> */}
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-all cursor-pointer" onClick={()=>router.push('/signup')}>
                  Sign Up
                </button>
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-all cursor-pointer" onClick={()=>router.push('/login')}>
                  Login
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Destinations</a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">About</a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Community</a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Pack Your Bags, Adventure Awaits: Travel Together, Pack Smarter!
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
            
            Your Next Adventure Starts Here
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                Start Planning
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all">
                Explore Destinations
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-12 left-0 right-0">
            <div className="flex justify-center gap-8 sm:gap-16 text-white text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold">500+</div>
                <div className="text-sm sm:text-base mt-1">Destinations</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold">50k+</div>
                <div className="text-sm sm:text-base mt-1">Travelers</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold">100%</div>
                <div className="text-sm sm:text-base mt-1">Adventure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}