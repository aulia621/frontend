$(document).ready(function () {
    // Logika untuk menambahkan tugas
    $("#addBtn").click(function () {
        let taskText = $("#taskInput").val().trim();

        // Validasi: tidak boleh kosong
        if (taskText === "") {
            alert("Tugas tidak boleh kosong!");
            return;
        }

        // Buat elemen <li> baru
        let li = $("<li></li>").text(taskText);

        // Tombol hapus
        let deleteBtn = $("<button class='delete-btn'>Hapus</button>");

        // Tambahkan tombol hapus ke li
        li.append(deleteBtn);

        // Tambahkan item ke daftar
        $("#tasklist").append(li);

        // Bersihkan input
        $("#taskInput").val("");
    });

    // Delegasi event: tandai selesai saat li diklik
    $("#tasklist").on("click", "li", function () {
        $(this).toggleClass("task-done");
    });

    // Delegasi event: hapus item saat tombol hapus diklik
    $("#tasklist").on("click", ".delete-btn", function (event) {
        event.stopPropagation(); // mencegah klik li

        // Mengambil parent (yaitu, li) dan menganimasikannya sebelum dihapus
        $(this).parent().fadeOut(300, function () {
            $(this).remove();
        });
    });
});