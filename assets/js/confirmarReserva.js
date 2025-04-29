document.getElementById('finalizar-compra').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = "Olá! Gostaria de reservar:%0A";

    // Parte 1: Listar os quartos de acordo com a quantidade de cada um
    cart.forEach((item, index) => {
        const quantityInput = document.getElementById(`quantity-${index}`);
        const quantity = parseInt(quantityInput.value);

        for (let i = 0; i < quantity; i++) {
            message += `* ${item.title}%0A`;
        }
    });

    // Parte 2: Pegando os dados (assumindo que são iguais para todos)
    const { adultos, criancas, quartos } = cart[0];

    message += `%0A  - Adultos: ${adultos}%0A`;
    message += `  - Crianças: ${criancas}%0A`;
    message += `  - Quartos: ${quartos}%0A`;

    const phone = '5591985668050';
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    window.location.href = whatsappURL;
});
