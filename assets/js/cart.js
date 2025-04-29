const buttons = document.querySelectorAll('.card-button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-price').textContent;
        const image = card.querySelector('.card-image').getAttribute('src');

        const adultos = document.getElementById('adult-count').textContent;
        const criancas = document.getElementById('child-count').textContent;
        const quartos = document.getElementById('room-count').textContent;

        const room = { title, price, image, adultos, criancas, quartos };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(room);
        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = 'cart.html';
    });
});
