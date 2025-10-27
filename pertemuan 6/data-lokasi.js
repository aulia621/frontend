// 1. data struktur
// kunci adalah nilai benua,dan isinya adalah array negara.
const dataLokasi = {
  asia: ['Jepang', 'Indonesia', 'Korea Selatan', 'India'],
  eropa: ['Jerman', 'Prancis', 'Italia', 'Spanyol'],
  amerika: ['Amerika Serikat', 'Kanada', 'Brasil', 'Meksiko'],
};

//2. fungsi untuk menginisialisasi dropdown benua saat halaman dimuat
function inisialisasiBenua() {
  const selectBenua = document.getElementById('benua');

  //temukan opsi default
  let defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '--Pilih Benua --';
  selectBenua.appendChild(defaultOption);

  // iterasi melalui datalokasi dan tambahkan opsi benua
  for (const benuaKey in dataLokasi) {
    let option = document.createElement('option');
    // gunakan key sebagai value (misalnya:"asia")
    option.value = benuaKey;
    //ubah key menjadi teks yang lebih rapi
    option.textContent = benuaKey.charAt(0).toUpperCase() + benuaKey.slice(1);
    selectBenua.append(option);
  }
}
// 3. fungsi utama yang dipanggil saat pilihan benua diubah
function updateNegara() {
  const selectBenua = document.getElementById('benua');
  const selectNegara = document.getElementById('negara');
  const hasilElement = document.getElementById('hasil');

  //dapatkn nilai
  const benuaTerpilih = selectBenua.value;

  selectNegara.innerHTML = '';
  hasilElement.textContent = '';

  if (benuaTerpilih) {
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Pilih Negara --';
    selectNegara.appendChild(defaultOption);

    const negaraArray = dataLokasi[benuaTerpilih];

    negaraArray.forEach((negara) => {
      let option = document.createElement('option');
      option.value = negara.toLowerCase().replace(/\s/g, '');
      option.textContent = negara;
      selectNegara.appendChild(option);
    });
    selectNegara.onchange = tampilHasil;
  } else {
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = ' -- Pilih Benua Dahulu --';
    selectNegara.appendChild(defaultOption);
  }
}

// 4. fungsi untuk menampilkan hasi akhir

function tampilkanHasil() {
  const selectBenua = document.getElementById('benua');
  const selectNegara = document.getElementById('negara');
  const hasilElement = document.getElementById('hasil');

  const benuaTeks = selectBenua.option[selectBenua.selectedIndex].textContent;
  const negaraTeks = selectNegara.option[selectNegara.selectedIndex].textContent;

  if (selectNegara.value) {
    hasilElement.textContent = 'anda memilih : ${negaraTeks}, yang terletak dibenua ${benuaTeks}.';
    hasilElement.style.color = 'green';
  } else {
    hasilElement.textContent = 'Silahkan Lengkapi pilihan Anda.';
    hasilElement.style.color = 'orange';
  }
}

document.addEventListener('DOMContentLoaded', inisialisasiBenua);
