const tombolBuka = document.getElementById('tombolBuka');
const tombolTutup = document.getElementById('tombolTutup');
const modaloverlay = document.getElementById('modaloverlay');

tombolBuka.addEventListener('click', () => {
  modaloverlay.classList.add('popup-tampil');
});

tombolTutup.addEventListener('click', () => {
  modaloverlay.classList.remove('popup-tampil');
});

modaloverlay.addEventListener('click', (e) => {
  if (e.target === modaloverlay) {
    modaloverlay.classList.remove('popup-tampil');
  }
});
