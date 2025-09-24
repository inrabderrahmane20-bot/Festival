
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const location = useLocation();
  const cart = JSON.parse(localStorage.getItem('objectif_cart') || '{"items":[]}');
  const count = cart.items.reduce((s,i)=>s+i.qty,0);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <Link to="/"><h1>Objectif</h1><div className="tag">Festival & Événements</div></Link>
        </div>
        <nav className="main-nav">
          <Link to="/programming" className={location.pathname.startsWith('/programming')? 'active' : ''}>Programmation</Link>
          <Link to="/speakers">Invités</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/cart" className="cart">Panier {count>0 ? `(${count})` : ''}</Link>
        </nav>
      </div>
    </header>
  )
}
