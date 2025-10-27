function hitungBiaya() {
  let berat = parseFloat(document.getElementById('berat').value);
  let asal = document.getElementById('asal').value;
  let tujuan = document.getElementById('tujuan').value;
  let hasil = document.getElementById('hasil');

  if (!berat || !asal || !tujuan) {
    hasil.innerHTML = 'Mohon lengkapi semua data!';
    return;
  }

  if (asal === tujuan) {
    hasil.innerHTML = ' Kota asal dan tujuan tidak boleh sama!';
    return;
  }

  // Biaya berdasarkan berat
  let biayaBerat = 0;
  if (berat <= 1) biayaBerat = 1500;
  else if (berat <= 5) biayaBerat = 2500;
  else if (berat <= 10) biayaBerat = 3500;
  else biayaBerat = 4500;

  // Tabel biaya jarak antar kota
  const biayaJarak = {
    Banyuwangi: { Jember: 7500, Probolinggo: 10000, Surabaya: 15000 },
    Jember: { Banyuwangi: 7500, Probolinggo: 7500, Surabaya: 12500 },
    Probolinggo: { Banyuwangi: 10000, Jember: 7500, Surabaya: 6500 },
    Surabaya: { Banyuwangi: 15000, Jember: 12500, Probolinggo: 6500 },
  };

  let biayaJrk = biayaJarak[asal][tujuan];
  let total = biayaBerat + biayaJrk;

  hasil.innerHTML = `
        Total Biaya Pengiriman: <br>
        Biaya Berat = Rp ${biayaBerat.toLocaleString()} <br>
        Biaya Jarak = Rp ${biayaJrk.toLocaleString()} <br>
        <hr>
         Total = <b>Rp ${total.toLocaleString()}</b>
    `;
}
