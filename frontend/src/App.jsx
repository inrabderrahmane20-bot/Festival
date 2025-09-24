import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Programming from './pages/Programming'
import EventDetail from './pages/EventDetail'
import Speakers from './pages/Speakers'
import Cart from './pages/Cart'
import Header from './components/Header'
import Admin from './pages/Admin'
import AdminAuth from './pages/AdminAuth'
import AdminDashboard from './pages/AdminDashboard'
import AdminEvents from './pages/AdminEvents'
import AdminSpeakers from './pages/AdminSpeakers'

export default function App(){
  return (
    <div className="app">
      <Header/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/programming" element={<Programming/>} />
          <Route path="/events/:id" element={<EventDetail/>} />
          <Route path="/speakers" element={<Speakers/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin/events" element={<AdminEvents/>} />
          <Route path="/admin/speakers" element={<AdminSpeakers/>} />
          <Route path="/admin" element={<Navigate to="/admin/auth" replace />} />
          <Route path="/admin/auth" element={<AdminAuth/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />

          <Route path="/admin/info" element={<Admin/>} />
        </Routes>
      </main>
    </div>
  )
}
