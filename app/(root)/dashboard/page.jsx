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

      const res = await fetch(`/api/events?userId=${user._id}`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create New
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No upcoming trips or events.</p>
        )}
      </div>
    </div>
  );
}
