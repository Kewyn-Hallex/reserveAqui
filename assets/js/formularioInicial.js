document.getElementById('user-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('user-name').value.trim();
  let phone = document.getElementById('user-phone').value.replace(/\D/g, ''); // remove tudo que não for número

  if (phone.length < 10) {
      alert('Por favor, insira um número de telefone válido com DDD.');
      return;
  }

  const ddd = phone.slice(0, 2);
  const numero = phone.slice(2);

  // Salvar no localStorage
  localStorage.setItem('userName', name);
  localStorage.setItem('userDDD', ddd);
  localStorage.setItem('userPhoneNumber', numero);

  // Ocultar o card
  document.getElementById('popup-card').style.display = 'none';
});