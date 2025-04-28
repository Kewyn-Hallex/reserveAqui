// Variáveis dos contadores
let adultCount = 2;
let childCount = 0;
let roomCount = 1;

// Elementos HTML
const adultCountElement = document.getElementById('adult-count');
const childCountElement = document.getElementById('child-count');
const roomCountElement = document.getElementById('room-count');
const guestInfoElement = document.getElementById('guest-info');
const guestButton = document.getElementById('guest-button');
const guestCard = document.getElementById('guest-card');
const guestSelection = document.querySelector('.guest-selection');
const applyButton = document.getElementById('apply-button'); // Botão "Aplicar"

// Atualizar o texto de hóspedes
function updateGuestInfo() {
    guestInfoElement.textContent = `${adultCount} adulto${adultCount > 1 ? 's' : ''} · ${childCount} criança${childCount !== 1 ? 's' : ''} · ${roomCount} quarto${roomCount > 1 ? 's' : ''}`;
}

// Funções de incrementar e decrementar
function increaseAdults() {
    adultCount++;
    adultCountElement.textContent = adultCount;
    updateGuestInfo();
}

function decreaseAdults() {
    if (adultCount > 1) {
        adultCount--;
        adultCountElement.textContent = adultCount;
        updateGuestInfo();
    }
}

function increaseChildren() {
    childCount++;
    childCountElement.textContent = childCount;
    updateGuestInfo();
}

function decreaseChildren() {
    if (childCount > 0) {
        childCount--;
        childCountElement.textContent = childCount;
        updateGuestInfo();
    }
}

function increaseRooms() {
    roomCount++;
    roomCountElement.textContent = roomCount;
    updateGuestInfo();
}

function decreaseRooms() {
    if (roomCount > 1) {
        roomCount--;
        roomCountElement.textContent = roomCount;
        updateGuestInfo();
    }
}

// Eventos dos botões de contagem
document.getElementById('adult-increase').addEventListener('click', increaseAdults);
document.getElementById('adult-decrease').addEventListener('click', decreaseAdults);
document.getElementById('child-increase').addEventListener('click', increaseChildren);
document.getElementById('child-decrease').addEventListener('click', decreaseChildren);
document.getElementById('room-increase').addEventListener('click', increaseRooms);
document.getElementById('room-decrease').addEventListener('click', decreaseRooms);

// Evento de abrir/fechar o card
guestButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede de fechar imediatamente
    guestCard.style.display = guestCard.style.display === 'block' ? 'none' : 'block';
});

// Fecha o card se clicar fora
document.addEventListener('click', (e) => {
    if (!guestCard.contains(e.target) && !guestButton.contains(e.target)) {
        guestCard.style.display = 'none';
    }
});

// Evento para montar e enviar a mensagem ao clicar em "Aplicar"
applyButton.addEventListener('click', () => {
    const adultos = adultCount;
    const criancas = childCount;
    const quartos = roomCount;
    // Montar a mensagem
    const mensagem = `Olá! Gostaria de reservar:\n- ${adultos} adulto${adultos > 1 ? 's' : ''}\n- ${criancas} criança${criancas !== 1 ? 's' : ''}\n- ${quartos} quarto${quartos > 1 ? 's' : ''}`;

    // Codificar a mensagem para o WhatsApp
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Número do WhatsApp (substituir por seu número)
    const numeroTelefone = '5591985668050'; // Exemplo: 55 + DDD + número

    // Link para abrir no WhatsApp
    const linkWhatsapp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;

    // Abrir o WhatsApp
    window.open(linkWhatsapp, '_blank');
});
