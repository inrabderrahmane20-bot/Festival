// frontend/src/pages/AdminAuth.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminAuth(){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    setErr(null)
    if (user === 'admin' && pass === 'admin*') {
      localStorage.setItem('objectif_isAdmin', 'true')
      navigate('/admin/dashboard')
    } else {
      setErr('Identifiants incorrects')
    }
  }

  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Connexion administrateur</h2>
      <form onSubmit={submit} style={{display:'flex',flexDirection:'column', gap:8}}>
        <label>
          Nom d'utilisateur
          <input value={user} onChange={e=>setUser(e.target.value)} />
        </label>
        <label>
          Mot de passe
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        </label>
        {err && <div style={{color:'crimson'}}>{err}</div>}
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit">Se connecter</button>
          <button type="button" className="btn" onClick={()=>{ setUser(''); setPass(''); setErr(null) }}>
            Effacer
          </button>
        </div>
      </form>
    </div>
  )
}
