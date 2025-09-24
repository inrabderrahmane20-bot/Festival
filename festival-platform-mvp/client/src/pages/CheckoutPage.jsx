import React from 'react'

export default function CheckoutPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout (Mockup)</h2>
      <p>This is a mock checkout page. Integrate with your payment provider here.</p>
      <form className="mt-4 space-y-3">
        <input type="text" placeholder="Name" className="w-full border rounded p-2" />
        <input type="email" placeholder="Email" className="w-full border rounded p-2" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Pay Now</button>
      </form>
    </div>
  )
}
