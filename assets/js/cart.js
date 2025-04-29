// Atualiza o contador no carrinho
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Chamada inicial ao carregar a página
updateCartCount();

const buttons = document.querySelectorAll('.card-button');

const notyf = new Notyf({
position: {
  x: 'center',
  y: 'top',
},
duration: 2500,
types: [
  {
    type: 'success',
    background: '#4BB543',
    icon: {
      className: 'fas fa-check-circle',
      tagName: 'i',
      color: '#fff'
    }
  }
]
});

buttons.forEach((button) => {
button.addEventListener('click', () => {
  const card = button.closest('.card');
  const title = card.querySelector('.card-title').textContent;
  const price = card.querySelector('.card-price').textContent;
  const image = card.querySelector('.card-image').getAttribute('src');

  const adultos = document.getElementById('adult-count').textContent;
  const criancas = document.getElementById('child-count').textContent;
  const quartosSelecionados = roomCount; // Usando roomCount da search bar

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se o número de quartos no carrinho já atingiu o limite
  if (cart.length >= quartosSelecionados) {
    notyf.error('Você já adicionou o número máximo de quartos selecionados!');
    return; // Impede que o quarto seja adicionado
  }

  const room = { title, price, image, adultos, criancas, quartos: 1 };

  cart.push(room);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Atualiza o contador no ícone
  updateCartCount();

  // Notificação personalizada
  notyf.success(`"${title}" adicionado à sua reserva!`);
});
});
