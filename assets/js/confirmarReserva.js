
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const container = document.getElementById('cart-container');
const totalDisplay = document.getElementById('total-value');

// 🟢 Passo 2: Calcular dias entre entrada e saída
const entradaStr = localStorage.getItem('reservaEntrada');
const saidaStr = localStorage.getItem('reservaSaida');
let diasHospedagem = 1;

if (entradaStr && saidaStr) {
    const entradaDate = new Date(entradaStr);
    const saidaDate = new Date(saidaStr);

    // Elimina diferença de horário
    entradaDate.setHours(0, 0, 0, 0);
    saidaDate.setHours(0, 0, 0, 0);

    // Calcula a diferença de dias corretamente
    const diffTime = saidaDate - entradaDate;
    diasHospedagem = diffTime / (1000 * 60 * 60 * 24);
}

if (cart.length === 0) {
    container.innerHTML = '<p>Sem reserva.</p>';
} else {
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';

        div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-info">
                    <div class="cart-title">${item.title}</div>
                    <div class="cart-price">Preço: R$ <span id="price-${index}">${item.price}</span></div>

                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <input type="text" id="quantity-${index}" value="1" readonly>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>

                    <div class="extras">
                        <label class="custom-checkbox">
                            <input type="checkbox" class="extra-checkbox" id="extra-${index}" onchange="updateTotal()">
                            TV e Frigobar
                        </label>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})"><i class="bi bi-trash-fill"></i></button>
            `;
        container.appendChild(div);
    });

    updateTotal();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function decreaseQuantity(index) {
    const input = document.getElementById(`quantity-${index}`);
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
        updateTotal();
    }
}

function increaseQuantity(index) {
    const input = document.getElementById(`quantity-${index}`);
    let value = parseInt(input.value);
    input.value = value + 1;
    updateTotal();
}

function updateTotal() {
    let total = 0;

    cart.forEach((item, index) => {
        const qty = parseInt(document.getElementById(`quantity-${index}`).value);
        let price = parseFloat(item.price.replace('R$', '').replace(',', '.'));
        const extra = document.getElementById(`extra-${index}`).checked ? 20 : 0;

        total += qty * (price + extra) * diasHospedagem;
    });

    totalDisplay.textContent = total.toFixed(2).replace('.', ',');
}

// 🟢 Passo 3: Enviar mensagem para o WhatsApp
document.getElementById('finalizar-compra').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const name = localStorage.getItem('userName') || 'Não informado';
    const ddd = localStorage.getItem('userDDD') || '--';
    const numero = localStorage.getItem('userPhoneNumber') || '--------';
    const phoneUser = `(${ddd}) ${numero}`;

    let message = "✨ *Solicitação de Reserva* ✨%0A%0A";
    message += `👤 *Nome:* ${name}%0A`;
    message += `📱 *Telefone:* ${phoneUser}%0A%0A`;

    // Formatar as datas sem o horário
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const entradaFormatada = entradaStr ? formatDate(entradaStr) : 'Não informada';
    const saidaFormatada = saidaStr ? formatDate(saidaStr) : 'Não informada';

    message += `🗓️ *Entrada:* ${entradaFormatada}%0A`;
    message += `🏁 *Saída:* ${saidaFormatada}%0A`;
    message += `📆 *Diárias:* ${diasHospedagem}%0A%0A`;

    message += "🛌 *Detalhes da hospedagem:*%0A";
    let total = 0;

    cart.forEach((item, index) => {
        const quantityInput = document.getElementById(`quantity-${index}`);
        const quantity = parseInt(quantityInput.value);
        const extraChecked = document.getElementById(`extra-${index}`).checked;

        const preco = parseFloat(item.price.replace('R$', '').replace(',', '.'));
        const precoExtra = extraChecked ? 20 : 0;
        const precoTotalItem = (preco + precoExtra) * quantity * diasHospedagem;

        for (let i = 0; i < quantity; i++) {
            message += `• ${item.title}${extraChecked ? " (com *TV* e *Frigobar*)" : ""}%0A`;
        }

        total += precoTotalItem;
    });

    if (cart[0].adultos && cart[0].criancas && cart[0].quartos) {
        message += `%0A👥 *Adultos:* ${cart[0].adultos}%0A`;
        message += `👶 *Crianças:* ${cart[0].criancas}%0A`;
        message += `🏠 *Total de quartos:* ${cart[0].quartos}%0A`;
    }

    const totalFormatado = total.toFixed(2).replace('.', ',');
    message += `%0A💵 *Valor total:* R$ ${totalFormatado}%0A`;

    const phone = '5591985668050';
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    // Limpar o carrinho
    localStorage.removeItem('cart');

    // Redirecionar para o WhatsApp
    window.location.href = whatsappURL;
});


