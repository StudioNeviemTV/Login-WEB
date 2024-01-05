function manageUser() {
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      data.users.forEach(user => {
        console.log('Username: ' + user.username + ', Email: ' + user.email);
      });
    });
  alert('Check your console')
}
function logOut() {
window.location.href = '../index.html';
}