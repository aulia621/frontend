var password = prompt('Apa password kamu?');
if (password == 'momentum') {
  document.write('<p>Password yang anda masukan benar yaitu: ' + password + '</p>');
} else {
  alert('maaf password anda salah.. silahkan coba lagu');
  window.location = 'prompteksternal.html';
}
