import React, { useEffect, useState } from 'react'

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([])
  useEffect(() => {
    fetch('/api/v1/speakers')
      .then(r => r.json())
      .then(data => setSpeakers(Array.isArray(data) ? data : data.speakers || []))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Speakers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speakers.map(sp => (
          <div key={sp.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{sp.name}</h3>
            <p className="text-gray-700">{sp.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
