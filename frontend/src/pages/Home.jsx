
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const [featured, setFeatured] = useState([])
  useEffect(()=>{
    axios.get(API_BASE + '/events').then(r => {
      setFeatured(r.data.slice(0,3))
    })
  },[])
  return (
    <div>
      <section className="hero container">
        <div className="left">
          <h2>Objectif — Les mondes de demain</h2>
          <p>Plateforme de programmation et de billetterie pour festivals multi‑événements. Recherchez, réservez et gérez vos billets en quelques clics.</p>
          <Link to="/programming" className="btn">Découvrir la programmation</Link>
        </div>
        <div className="right" style={{width:340}}>
          <div style={{background:'rgba(255,255,255,0.08)',padding:14,borderRadius:10}}>
            <strong>Dates</strong>
            <div>18 — 21 septembre 2025</div>
            <small style={{opacity:0.9}}>Thème: Les mondes de demain</small>
          </div>
        </div>
      </section>

      <section className="container" style={{marginTop:18}}>
        <h3>Événements à la une</h3>
        <div className="grid" style={{marginTop:12}}>
          {featured.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
      </section>
    </div>
  )
}
