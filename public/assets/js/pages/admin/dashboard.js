let bookTable = null;

// === Helper AJAX dengan token expired handler ===
function ajaxWithToken(options) {
    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = "Bearer " + getToken();

    const originalError = options.error;
    options.error = function (xhr, status, error) {
        if (xhr.status === 401) {
            alert("Sesi telah kedaluwarsa. Silakan login ulang.");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        if (originalError) originalError(xhr, status, error);
    };

    $.ajax(options);
}

// === Init DataTable ===
function initBookTable() {
    if (bookTable) bookTable.destroy();

    bookTable = $("#bookTable").DataTable({
        serverSide: true,
        processing: true,
        responsive: true,
        language: { url: "/assets/js/id.json" },
        ajax: function (data, callback) {
            const page = Math.floor(data.start / data.length) + 1;
            const size = data.length || 6;

            ajaxWithToken({
                url: "/api/books",
                type: "GET",
                data: { page: page, per_page: size, search: data.search.value || "" },
                success: function (res) {
                    const books = res.data || [];
                    const total = res.total || books.length;

                    const rows = books.map((b, i) => [
                        (res.from || (page - 1) * size) + i,
                        `<img src="/storage/${b.image}" style="height:60px;border-radius:4px;">`,
                        b.name,
                        b.description,
                        `
                            <button class="btn btn-warning btn-sm edit-btn" 
                                data-id="${b.id}" data-name="${b.name}" 
                                data-description="${b.description}" data-image="${b.image}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" 
                                data-id="${b.id}" data-name="${b.name}">
                                <i class="bi bi-trash"></i>
                            </button>
                        `,
                    ]);

                    callback({
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: rows,
                    });
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        alert("Token login sudah expired. Silakan login ulang.");
                        window.location.href = "/login";
                        return;
                    }
                    alert("Gagal memuat data buku!");
                    callback({ draw: data.draw, data: [] });
                },
            });
        },
        lengthMenu: [5, 10, 25, 50],
        pageLength: 6,
        columns: [
            { title: "No" },
            { title: "Gambar" },
            { title: "Nama Buku" },
            { title: "Deskripsi" },
            { title: "Aksi", orderable: false, searchable: false },
        ],
    });
}

// === Upload Buku Baru ===
function uploadBook() {
    const name = $("#namaBuku").val().trim();
    const description = $("#deskripsi").val().trim();
    const image = $("#image")[0].files[0];

    if (!name || !description || !image) {
        alert("Semua field wajib diisi!");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    ajaxWithToken({
        url: "/api/books",
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Buku berhasil diupload!");
            $("#uploadForm")[0].reset();
            bookTable.ajax.reload(null, false);
        },
    });
}

// === Tampilkan Modal Edit ===
function showEditBookModal(id, name, description, image) {
    $("#editBookId").val(id);
    $("#editNamaBuku").val(name);
    $("#editDeskripsi").val(description);
    $(".edit-image-group").html(`
        <label class="form-label">Gambar Saat Ini:</label><br>
        <img id="editImagePreview" src="/storage/${image}" 
            style="max-height:70px;border-radius:5px;margin-bottom:10px;">
        <input type="file" class="form-control" id="editImageInput" name="editImage" accept="image/*">
    `);

    $("#editImageInput").on("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => $("#editImagePreview").attr("src", e.target.result);
            reader.readAsDataURL(file);
        }
    });

    new bootstrap.Modal(document.getElementById("editModal")).show();
}

// === Submit Edit Buku ===
function submitEditBook() {
    const id = $("#editBookId").val();
    const name = $("#editNamaBuku").val().trim();
    const description = $("#editDeskripsi").val().trim();
    const image = $("#editImageInput")[0]?.files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("_method", "PUT");
    if (image) formData.append("image", image);

    ajaxWithToken({
        url: `/api/books/${id}`,
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Buku berhasil diperbarui!");
            $("#editModal").modal("hide");
            bookTable.ajax.reload(null, false);
        },
    });
}

// === Hapus Buku ===
function showDeleteBookModal(id, name) {
    $("#deleteBookName").text(name);
    $("#confirmDeleteBtn").data("id", id);
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

function confirmDeleteBook() {
    const id = $("#confirmDeleteBtn").data("id");

    ajaxWithToken({
        url: `/api/books/${id}`,
        type: "DELETE",
        success: function () {
            alert("Buku berhasil dihapus!");
            $("#deleteModal").modal("hide");
            bookTable.ajax.reload(null, false);
        },
    });
}

// === Document Ready ===
$(document).ready(function () {
    initBookTable();

    $("#uploadForm").on("submit", function (e) {
        e.preventDefault();
        uploadBook();
    });

    $("#bookTable").on("click", ".edit-btn", function () {
        showEditBookModal($(this).data("id"), $(this).data("name"), $(this).data("description"), $(this).data("image"));
    });

    $("#bookTable").on("click", ".delete-btn", function () {
        showDeleteBookModal($(this).data("id"), $(this).data("name"));
    });

    $("#editForm").on("submit", function (e) {
        e.preventDefault();
        submitEditBook();
    });

    $("#confirmDeleteBtn").on("click", confirmDeleteBook);
});