
import React from 'react'

export default function Admin(){
  return (
    <div className="container">
      <h2>Back-office (Prototype)</h2>
      <p>This is a placeholder admin area. In a full implementation you would find CRUD for events, ticket configuration, promo codes, exports, and audit logs.</p>
      <ul>
        <li>Event management (create / edit / capacities)</li>
        <li>Tickets & quotas</li>
        <li>Sales dashboard</li>
        <li>Access control (QR scanners)</li>
      </ul>
    </div>
  )
}
