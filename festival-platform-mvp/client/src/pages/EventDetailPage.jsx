import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    fetch('/api/v1/events')
      .then(r => r.json())
      .then(data => {
        const evs = Array.isArray(data) ? data : data.events || []
        setEvent(evs.find(e => e.id === id))
      })
  }, [id])

  if (!event) return <p>Loading...</p>

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.date} · {event.venue}</p>
      <p className="mb-4">{event.description}</p>
      <p className="font-semibold">Price: ${event.price}</p>
    </div>
  )
}
