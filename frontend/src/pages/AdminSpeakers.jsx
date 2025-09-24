// frontend/src/pages/AdminSpeakers.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function AdminSpeakers(){
  const [speakers, setSpeakers] = useState([])
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadSpeakers()
  }, [])

  async function loadSpeakers(){
    const res = await axios.get(`${API_BASE}/speakers`)
    setSpeakers(res.data || [])
  }

  function addSpeaker(e){
    e.preventDefault()
    const newSp = { id: Date.now(), name, bio }
    setSpeakers([...speakers, newSp])
    setName('')
    setBio('')
  }

  function deleteSpeaker(id){
    setSpeakers(speakers.filter(sp => sp.id !== id))
  }

  return (
    <div className="container">
      <h2>Gestion des intervenants</h2>
      <button className="btn" onClick={()=>navigate('/admin/dashboard')}>⬅ Retour</button>

      <form onSubmit={addSpeaker} style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
        <input placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} required />
        <textarea placeholder="Bio" value={bio} onChange={e=>setBio(e.target.value)} required />
        <button className="btn" type="submit">Ajouter</button>
      </form>

      <h3 style={{marginTop:18}}>Liste des intervenants</h3>
      <ul>
        {speakers.map(sp => (
          <li key={sp.id}>
            <strong>{sp.name}</strong> — {sp.bio}
            <button className="btn" onClick={()=>deleteSpeaker(sp.id)} style={{marginLeft:8}}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
