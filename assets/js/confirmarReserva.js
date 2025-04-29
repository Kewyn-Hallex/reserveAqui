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

    message += "🛌 *Detalhes da hospedagem:*%0A";
    let total = 0;

    cart.forEach((item, index) => {
        const quantityInput = document.getElementById(`quantity-${index}`);
        const quantity = parseInt(quantityInput.value);
        const extraChecked = document.getElementById(`extra-${index}`).checked;

        const preco = parseFloat(item.price.replace('R$', '').replace(',', '.'));
        const precoExtra = extraChecked ? 20 : 0;
        const precoTotalItem = (preco + precoExtra) * quantity;

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
    message += `%0A💵 *Valor total:* R$ ${totalFormatado}`;

    const phone = '5591985668050';
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    window.location.href = whatsappURL;
});
