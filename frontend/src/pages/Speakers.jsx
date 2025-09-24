
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'
export default function Speakers(){
  const [speakers, setSpeakers] = useState([])
  useEffect(()=>{ axios.get(API_BASE + '/speakers').then(r=>setSpeakers(r.data)) },[])
  return (
    <div className="container">
      <h2>Invités</h2>
      <div className="grid" style={{marginTop:12}}>
        {speakers.map(s => (
          <div key={s.id} className="card">
            <div style={{height:120,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <strong>{s.name}</strong>
            </div>
            <div style={{padding:12}}>
              <div style={{color:'#374151'}}>{s.short_bio}</div>
              <div style={{marginTop:8,fontSize:13,color:'#6b7280'}}>Participe à: {s.events.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
