const barang = {
  pc: [
    { nama: 'PC Rakitan Core i7', harga: 6500000 },
    { nama: 'Laptop Lenovo', harga: 8000000 },
    { nama: 'Laptop Asus', harga: 9500000 },
  ],
  aksesoris: [
    { nama: 'Mouse Logitech', harga: 150000 },
    { nama: 'Keyboard Rexus', harga: 250000 },
    { nama: 'Headset JBL', harga: 350000 },
  ],
  monitor: [
    { nama: 'Asus', harga: 100000 },
    { nama: 'Lighting', harga: 150000 },
  ]
};

function tampilkanPopup() {
  const kategori = document.getElementById('kategori').value;
  const popup = document.getElementById('popup');
  const daftarBarang = document.getElementById('daftarBarang');
  daftarBarang.innerHTML = '';

  if (!kategori) {
    alert('Silakan pilih kategori terlebih dahulu!');
    return;
  }

  barang[kategori].forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'barang';
    div.innerHTML = `
      <span>${item.nama} (Rp ${item.harga.toLocaleString()})</span>
      <button onclick="pilihBarang('${kategori}', '${index}')">Pilih</button>
    `;
    daftarBarang.appendChild(div);
  });

  popup.style.display = 'block';
}

function tutupPopup() {
  document.getElementById('popup').style.display = 'none';
}

function pilihBarang(kategori, index) {
  const item = barang[kategori][index];
  document.getElementById('namaBarang').value = item.nama;
  document.getElementById('harga').value = item.harga;
  
  tutupPopup();
}

function hitungTotal() {
  const harga = parseFloat(document.getElementById('harga').value) || 0;
  const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
  const jenisPenjualan = document.getElementById('jenisPenjualan').value;
  const kategori = document.getElementById('kategori').value;

  if (!harga || !kategori) {
    alert('Silakan pilih kategori dan barang terlebih dahulu!');
    return;
  }
  
  if (jumlah <= 0) {
    alert('silahkan pilih jumlah barang terlebih dahulu!');
    return;
  }

  const totalPenjualan = harga * jumlah;
  let diskon = 0;
  let pajak = 0;

  if (jenisPenjualan === 'tunai') {
    diskon = totalPenjualan * 0.1;
  }

  if (kategori === 'pc') {
    pajak = harga * 0.15;
  } else if (kategori === 'aksesori') {
    pajak = harga * 0.1;
  } else if (kategori === 'monitor') {
    pajak = harga * 0.12;
  }

  const hargaTotal = totalPenjualan - diskon + pajak;

  document.getElementById('totalPenjualan').value = totalPenjualan.toLocaleString();
  document.getElementById('diskon').value = diskon.toLocaleString();
  document.getElementById('pajak').value = pajak.toLocaleString();
  document.getElementById('hargaTotal').value = hargaTotal.toLocaleString();
}
