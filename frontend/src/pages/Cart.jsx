
import React, {useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('objectif_cart') || '{"items":[]}'))
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)

  function updateQty(index, qty){
    const c = {...cart}
    c.items[index].qty = Number(qty)
    setCart(c)
    localStorage.setItem('objectif_cart', JSON.stringify(c))
  }

  function removeItem(index){
    const c = {...cart}
    c.items.splice(index,1)
    setCart(c)
    localStorage.setItem('objectif_cart', JSON.stringify(c))
  }

  async function checkout(){
    if (!cart.items.length) return alert('Votre panier est vide')
    setLoading(true)
    try {
      await axios.post(API_BASE + '/cart', { items: cart.items })
      const res = await axios.post(API_BASE + '/checkout', { cart, customer: { name: 'Guest' } })
      setOrder(res.data)
      localStorage.removeItem('objectif_cart')
      setCart({items:[]})
    } catch (e){
      alert('Erreur lors du paiement (mock): ' + (e.response?.data?.error || e.message))
    } finally { setLoading(false) }
  }

  return (
    <div className="container">
      <h2>Panier</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
        <div>
          {cart.items.length===0 && <div className="panel">Votre panier est vide.</div>}
          {cart.items.map((it, idx) => (
            <div key={idx} className="card" style={{padding:12,marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div><strong>{it.event_id}</strong><div style={{color:'#6b7280'}}>Billet: {it.ticket_type}</div></div>
                <div>
                  <input value={it.qty} min="0" onChange={e=>updateQty(idx, e.target.value)} style={{width:64}} />
                  <div style={{marginTop:8}}><button onClick={()=>removeItem(idx)} style={{color:'#ef4444'}}>Supprimer</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside>
          <div className="panel">
            <h3>Résumé</h3>
            <div style={{marginBottom:12}}>Lignes : {cart.items.length}</div>
            <button className="btn" onClick={checkout} disabled={loading}>{loading ? 'Traitement...' : 'Payer (mock)'}</button>
            {order && <div style={{marginTop:12}} className="panel"><strong>Commande réussie</strong><div>ID: {order.order_id}</div><div>Billets:</div><ul>{order.tickets.map(t=> <li key={t.ticket_id}>{t.ticket_id} — code: {t.code}</li>)}</ul></div>}
          </div>
        </aside>
      </div>
    </div>
  )
}
