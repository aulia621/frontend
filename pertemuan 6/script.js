function loadData() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'data.json', true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parser(xhr.responseText);
      var output = '<ul>';
      data.forEach(function (mahasiswa) {
        output += '<li>' + mahasiswa.nama + '-' + mahasiswa.nim + '</li>';
      });
      output += '</ul>';
      document.getElementById('hasil').innerHTML = output;
    } else {
      document.getElementById('hasil').innerHTML = 'terjadi kesalahan saat mengambil data.';
    }
  };
  //kirim permintaan
  xhr.send();
}
