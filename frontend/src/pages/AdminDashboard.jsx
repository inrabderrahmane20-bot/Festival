// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function checkAdmin(){
  return localStorage.getItem('objectif_isAdmin') === 'true'
}

export default function AdminDashboard(){
  const navigate = useNavigate()
  useEffect(() => {
    if (!checkAdmin()) navigate('/admin/auth')
  }, [])

  function logout(){
    localStorage.removeItem('objectif_isAdmin')
    navigate('/')
  }

  return (
    <div className="container">
      <h2>Back-office — Admin</h2>
      <p>Vous êtes connecté en tant qu'administrateur. (Prototype)</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
        <div className="card" style={{padding:12}}>
          <h3>Événements</h3>
          <p>Modifier, créer ou supprimer des événements.</p>
          <button className="btn" onClick={()=>navigate('/admin/events')}>
            Gérer les événements
          </button>
        </div>
        <div className="card" style={{padding:12}}>
          <h3>Intervenants</h3>
          <p>Gérer les intervenants / profils.</p>
          <button className="btn" onClick={()=>navigate('/admin/speakers')}>
            Gérer les intervenants
          </button>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <button className="btn" onClick={()=>navigate('/programming')}>Voir la programmation</button>
        <button className="btn" onClick={logout} style={{marginLeft:8}}>Se déconnecter</button>
      </div>
    </div>
  )
}
