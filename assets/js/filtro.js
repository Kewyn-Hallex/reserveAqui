let reservas = [];

function adicionarQuarto(tipo) {
    // Adiciona o quarto selecionado ao carrinho de reservas
    reservas.push({ tipo: tipo, data: new Date().toISOString() });

    // Atualiza a lista de reservas exibida
    atualizarListaReservas();
}

function atualizarListaReservas() {
    const listaReservas = document.getElementById('listaReservas');
    listaReservas.innerHTML = ''; // Limpa a lista atual

    // Exibe todos os quartos no carrinho
    reservas.forEach((reserva, index) => {
        const li = document.createElement('li');
        li.textContent = `Quarto ${reserva.tipo.charAt(0).toUpperCase() + reserva.tipo.slice(1)} - Data: ${reserva.data}`;
        listaReservas.appendChild(li);
    });
}

document.getElementById('formularioReserva').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Enviar todas as reservas para o número do WhatsApp do dono do hotel
    enviarParaWhatsApp(nome, email, reservas);
});

function enviarParaWhatsApp(nome, email, reservas) {
    let mensagem = `Reservas:\nNome: ${nome}\nEmail: ${email}\n\n`;

    reservas.forEach(reserva => {
        mensagem += `Quarto: ${reserva.tipo.charAt(0).toUpperCase() + reserva.tipo.slice(1)}\nData da Reserva: ${reserva.data}\n\n`;
    });

    // Gerar URL para enviar via WhatsApp
    const urlWhatsApp = `https://wa.me/5511XXXXXXX?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}
