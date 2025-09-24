
import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({event}){
  return (
    <article className="card event-card">
      <div className="card-media" style={{backgroundImage:`url(${event.image_url})`}} />
      <div className="card-body">
        <h3><Link to={`/events/${event.id}`}>{event.title}</Link></h3>
        <p className="meta">{new Date(event.start_datetime).toLocaleString()}</p>
        <p className="excerpt">{event.short_description}</p>
        <div className="card-actions">
          <Link to={`/events/${event.id}`} className="btn">En savoir plus</Link>
        </div>
      </div>
    </article>
  )
}
