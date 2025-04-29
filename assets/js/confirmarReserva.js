document.getElementById('finalizar-compra').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = "Olá! Gostaria de reservar:%0A";

    cart.forEach((item) => {
        message += `* ${item.title}%0A`;
        message += `  - Adultos: ${item.adultos}%0A`;
        message += `  - Crianças: ${item.criancas}%0A`;
        message += `  - Quartos: ${item.quartos}%0A%0A`;
    });

    const phone = '5591985668050';
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    window.location.href = whatsappURL;
});