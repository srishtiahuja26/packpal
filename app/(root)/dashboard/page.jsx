'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      // Placeholder data until API is used
      const placeholderEvents = [
        { _id: 'a', title: 'x' },
        { _id: 'b', title: 'y' },
        { _id: 'c', title: 'z' },
      ];
      setEvents(placeholderEvents);
      setLoading(false);

      // Uncomment when API is ready
      /*
      const res = await fetch(`/api/events?userId=${user._id}`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
      */
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold transition-all duration-500 hover:text-blue-600 hover:scale-105">
          Dashboard
        </h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New
        </Link>
      </div>

      <div className="mb-6">
        {loading && (
          <p className="text-gray-400 text-left animate-pulse">Loading...</p>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm transition-all duration-500 hover:shadow-lg animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Upcoming Events and Trips
          </h2>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event, index) => (
                <Link
                  href={`/dashboard/${event._id}`}
                  key={event._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-gray-100 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    <p className="text-sm text-gray-500">ID: {event._id}</p>
                    <h3 className="text-lg font-semibold">Trip: {event.title}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center animate-pulse">
                No upcoming trips or events.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}