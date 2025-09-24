import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import SpeakersPage from './pages/SpeakersPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className="bg-slate-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="font-bold text-lg"><Link to="/">Festival Platform</Link></h1>
            <nav className="space-x-4">
              <Link to="/" className="hover:underline">Events</Link>
              <Link to="/speakers" className="hover:underline">Speakers</Link>
              <Link to="/checkout" className="hover:underline">Checkout</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
