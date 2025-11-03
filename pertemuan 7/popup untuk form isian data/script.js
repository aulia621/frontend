// 1. Inisialisasi Array untuk menyimpan data
var databarang = [];

// 2. Dapatkan elemen DOM
var modal = document.getElementById('popupModal');
var bukaBtn = document.getElementById('bukaFormulir');
var spanTutup = document.getElementsByClassName('tutup')[0];
var form = document.getElementById('formbarang');
var daftar = document.getElementById('daftarbarang');

// 3. Fungsi untuk menampilkan data dari array ke HTML
function tampilkanData() {
  daftar.innerHTML = ''; // Bersihkan data yang ada

  // Iterasi melalui array dan buat elemen <li>
  databarang.forEach(function (barang, index) {
    var li = document.createElement('li');
    li.textContent = 'Kode Barang: ' + barang.kode + ', Nama Barang: ' + barang.nama + ', Harga Barang: ' + barang.harga;
    daftar.appendChild(li);
  });
}

// 4. Event: Buka Modal
bukaBtn.onclick = function () {
  modal.style.display = 'block';
};

// 5. Event: Tutup Modal menggunakan 'x'
spanTutup.onclick = function () {
  modal.style.display = 'none';
};

// 6. Event: Tutup Modal jika klik di luar area modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// 7. Event: Penanganan Form Submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah form dari refresh halaman

  // Ambil nilai input
  var kodeInput = document.getElementById('kode').value;
  var namaInput = document.getElementById('nama').value;
  var hargaInput = document.getElementById('harga').value;

  // Buat objek data baru
  var barangBaru = {
    kode: kodeInput,
    nama: namaInput,
    harga: hargaInput,
  };

  // Simpan objek ke dalam array
  databarang.push(barangBaru);

  // Panggil fungsi untuk memperbarui tampilan
  tampilkanData();

  // Reset formulir dan tutup modal
  form.reset();
  modal.style.display = 'none';

  console.log('Data tersimpan:', databarang);
});

// 8. Panggil pertama kali untuk menampilkan array kosong (atau data awal jika ada)
tampilkanData();
