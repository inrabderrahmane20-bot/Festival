// Very small QR placeholder generator: returns a base64 string containing order json.
// In production, replace with a real QR generator and PDF renderer.
function generateQrData(order) {
  const s = JSON.stringify({ id: order.id, total_cents: order.total_cents, created_at: order.created_at });
  return Buffer.from(s).toString('base64');
}

module.exports = { generateQrData };
