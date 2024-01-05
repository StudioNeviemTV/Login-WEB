// Pri úspešnom prihlásení získajte token a uložte ho do localStorage
function validate() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const token = data.token;

        // Uložte token do localStorage
        localStorage.setItem('token', token);

        // Presmerujte na chránenú stránku
        window.location.href = './admin/index.html';
      } else {
        window.alert('Prihlasenie zlyhalo. Vaše údaje niesu správne.')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
