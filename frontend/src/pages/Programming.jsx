// frontend/src/pages/Programming.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../components/EventCard'
import { API_BASE } from '../config'

export default function Programming(){
  const [events, setEvents] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents(){
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (q) params.q = q
      if (category) params.category = category
      const res = await axios.get(`${API_BASE}/events`, { params })
      setEvents(res.data || [])
    } catch (err) {
      setError('Impossible de récupérer les événements')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function onKeyDownSearch(e){
    if (e.key === 'Enter') fetchEvents()
  }

  return (
    <div className="container">
      <h2>Programmation</h2>

      <div style={{display:'flex', gap:12, alignItems:'center', marginTop:8}}>
        <input
          aria-label="Recherche événements"
          placeholder="Rechercher par titre ou description..."
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKeyDownSearch}
          style={{flex:1, padding:8, borderRadius:6, border:'1px solid #ddd'}}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{padding:8, borderRadius:6, border:'1px solid #ddd'}}
        >
          <option value="">Toutes catégories</option>
          <option value="debat">Débat</option>
          <option value="atelier">Atelier</option>
          <option value="visite">Visite</option>
          <option value="spectacle">Spectacle</option>
        </select>

        <button className="btn" onClick={fetchEvents} aria-label="Filtrer">
          Filtrer
        </button>
        <button
          className="btn"
          onClick={() => { setQ(''); setCategory(''); fetchEvents() }}
          title="Réinitialiser filtres"
        >
          Réinitialiser
        </button>
      </div>

      {loading && <p style={{marginTop:12}}>Chargement…</p>}
      {error && <p style={{marginTop:12, color:'crimson'}}>{error}</p>}

      <div style={{marginTop:18}} className="grid">
        {events.length === 0 && !loading ? (
          <p>Aucun événement trouvé.</p>
        ) : (
          events.map(ev => <EventCard key={ev.id} event={ev} />)
        )}
      </div>
    </div>
  )
}
