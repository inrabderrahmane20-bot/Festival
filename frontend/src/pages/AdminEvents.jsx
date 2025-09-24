// frontend/src/pages/AdminEvents.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function AdminEvents(){
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents(){
    const res = await axios.get(`${API_BASE}/events`)
    setEvents(res.data || [])
  }

  async function addEvent(e){
    e.preventDefault()
    const newEvent = { id: Date.now(), title, description: desc }
    setEvents([...events, newEvent])
    setTitle('')
    setDesc('')
  }

  function deleteEvent(id){
    setEvents(events.filter(ev => ev.id !== id))
  }

  return (
    <div className="container">
      <h2>Gestion des événements</h2>
      <button className="btn" onClick={()=>navigate('/admin/dashboard')}>⬅ Retour</button>

      <form onSubmit={addEvent} style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
        <input placeholder="Titre" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} required />
        <button className="btn" type="submit">Ajouter</button>
      </form>

      <h3 style={{marginTop:18}}>Liste des événements</h3>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> — {ev.description}
            <button className="btn" onClick={()=>deleteEvent(ev.id)} style={{marginLeft:8}}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
