const calendarSelection = document.getElementById('calendar-selection');
const calendar = document.getElementById('calendar');
const dateText = document.getElementById('date-text');

let entrada = null;
let saida = null;

// Abrir ou esconder calendário
calendarSelection.addEventListener('click', () => {
  const isVisible = calendar.style.display === 'grid';
  calendar.style.display = isVisible ? 'none' : 'grid';
  if (!isVisible) generateCalendar();
});

function generateCalendar() {
  calendar.innerHTML = '';
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);

    const btn = document.createElement('button');
    btn.className = 'day';
    btn.textContent = day.getDate();

    if (entrada && day.toDateString() === entrada.toDateString()) {
      btn.classList.add('date-start');
    } else if (saida && day.toDateString() === saida.toDateString()) {
      btn.classList.add('date-end');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!entrada) {
        entrada = day;
      } else if (!saida && day > entrada) {
        saida = day;
        dateText.textContent = ` ${entrada.toLocaleDateString()} até ${saida.toLocaleDateString()}`;
        calendar.style.display = 'none';

        // 🟢 Passo 1: salvar as datas no localStorage
        localStorage.setItem('reservaEntrada', entrada.toISOString());
        localStorage.setItem('reservaSaida', saida.toISOString());

      } else {
        entrada = day;
        saida = null;
        dateText.textContent = ' Quando?';

        // 🧹 Limpa do localStorage caso a seleção reinicie
        localStorage.removeItem('reservaEntrada');
        localStorage.removeItem('reservaSaida');
      }
      generateCalendar();
    });

    calendar.appendChild(btn);
  }
}
