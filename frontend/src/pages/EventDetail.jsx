
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_BASE } from '../config'

export default function EventDetail(){
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [selectedTickets, setSelectedTickets] = useState({})

  useEffect(()=>{
    axios.get(API_BASE + '/events/' + id).then(r=>setEvent(r.data)).catch(()=>setEvent(null))
  },[id])

  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('objectif_cart') || '{"items":[]}')
    Object.keys(selectedTickets).forEach(ticketId => {
      const qty = Number(selectedTickets[ticketId] || 0);
      if (qty <= 0) return;
      const existing = cart.items.find(it => it.event_id === id && it.ticket_type === ticketId)
      if (existing) existing.qty += qty; else cart.items.push({ event_id: id, ticket_type: ticketId, qty })
    })
    localStorage.setItem('objectif_cart', JSON.stringify(cart))
    alert('Billets ajoutés au panier')
    window.location.href = '/cart'
  }

  if (!event) return <div className="container">Événement introuvable.</div>

  return (
    <div className="container">
      <div className="event-detail">
        <div>
          <div className="panel">
            <h2>{event.title}</h2>
            <p className="meta">{new Date(event.start_datetime).toLocaleString()} — {event.location.name}</p>
            <div dangerouslySetInnerHTML={{__html:event.long_description}} />
            <h4 style={{marginTop:16}}>Intervenants</h4>
            <ul>{event.speakers.map(s => <li key={s.id}>{s.name} — {s.role}</li>)}</ul>
          </div>
          <div style={{marginTop:12}} className="panel">
            <h4>Rendez‑vous conseillés</h4>
            <p>Des recommandations basées sur les tags: {event.tags.join(', ')}</p>
          </div>
        </div>
        <aside>
          <div className="panel">
            <h3>Billets</h3>
            <p>Capacité: {event.capacity}</p>
            {event.ticket_types.map(tt => (
              <div key={tt.id} className="ticket-row">
                <div>
                  <div style={{fontWeight:600}}>{tt.label} {tt.price_cents === 0 ? '(Gratuit)' : '— ' + (tt.price_cents/100).toFixed(2) + ' €'}</div>
                  <small style={{color:'#6b7280'}}>{tt.refundable ? 'Remboursable' : 'Non remboursable'}</small>
                </div>
                <div>
                  <input className="qty" type="number" min="0" defaultValue="0" onChange={e=>setSelectedTickets({...selectedTickets,[tt.id]:e.target.value})} />
                </div>
              </div>
            ))}
            <div style={{marginTop:12}}>
              <button className="btn" onClick={addToCart}>Ajouter au panier</button>
            </div>
            <div style={{marginTop:12,fontSize:13,color:'#6b7280'}}>
              <strong>Statut:</strong> {event.status === 'published' ? 'Ouvert à la réservation' : event.status}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
