// Simple front that lists events from API
async function loadEvents() {
  const root = document.getElementById('events');
  root.innerHTML = '<p>Chargement...</p>';
  try {
    const res = await fetch('/api/v1/events');
    const data = await res.json();
    if (!Array.isArray(data)) { root.innerHTML = '<p>Erreur de données</p>'; return; }
    root.innerHTML = '';
    data.forEach(ev => {
      const div = document.createElement('div');
      div.className = 'event';
      div.innerHTML = `<h3>${ev.title}</h3>
        <p>${ev.short_description || ''}</p>
        <p><strong>${ev.location && ev.location.name ? ev.location.name : ''}</strong> — ${ev.start_datetime || ''}</p>
        <a class='button' href='/api/v1/events/${ev.id}' target='_blank'>Voir JSON</a>`;
      root.appendChild(div);
    });
  } catch (err) {
    root.innerHTML = '<p>Erreur lors du chargement</p>';
  }
}

window.addEventListener('load', loadEvents);
