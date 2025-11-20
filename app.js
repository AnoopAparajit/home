document.addEventListener('DOMContentLoaded', () => {
  // Clock and Date
  function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const greetingElement = document.getElementById('greeting');

    // Time
    timeElement.textContent = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Date
    dateElement.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Dynamic Greeting
    const hour = now.getHours();
    let greeting = 'Welcome Home';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';

    if (greetingElement.textContent !== greeting) {
      greetingElement.textContent = greeting;
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

  // Quick Notes (LocalStorage)
  const notesArea = document.getElementById('quick-notes');
  const saveBtn = document.getElementById('save-notes');
  const savedNotes = localStorage.getItem('pi_dashboard_notes');

  if (savedNotes) {
    notesArea.value = savedNotes;
  }

  function saveNotes() {
    localStorage.setItem('pi_dashboard_notes', notesArea.value);

    // Visual feedback
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅';
    setTimeout(() => {
      saveBtn.textContent = originalText;
    }, 1000);
  }

  saveBtn.addEventListener('click', saveNotes);

  // Auto-save on typing (debounced)
  let timeoutId;
  notesArea.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      localStorage.setItem('pi_dashboard_notes', notesArea.value);
    }, 1000);
  });

  // Mock System Status Updates (Randomize slightly for "liveness")
  function updateSystemStatus() {
    const fills = document.querySelectorAll('.status-fill');
    const values = document.querySelectorAll('.status-value');

    fills.forEach((fill, index) => {
      // Random fluctuation around a base value
      const base = [15, 42, 38][index];
      const fluctuation = Math.floor(Math.random() * 10) - 5;
      const newValue = Math.max(0, Math.min(100, base + fluctuation));

      fill.style.width = `${newValue}%`;
      values[index].textContent = `${newValue}${index === 2 ? '°C' : '%'}`;
    });
  }

  setInterval(updateSystemStatus, 3000);
});
