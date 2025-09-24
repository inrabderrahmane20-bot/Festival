import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    fetch('/api/v1/events')
      .then(r => r.json())
      .then(data => setEvents(Array.isArray(data) ? data : data.events || []))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(ev => (
          <div key={ev.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-1">{ev.title}</h3>
            <p className="text-sm text-gray-600">{ev.date} · {ev.venue}</p>
            <p className="mt-2 text-gray-700">{ev.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="font-semibold">${ev.price}</span>
              <Link to={`/events/${ev.id}`} className="text-blue-600 hover:underline">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
