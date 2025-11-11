$(document).ready(function () {
  let currentSearchFavorite = "";
  const $searchInput = $("#homeSearchInput");
  const $searchBtn = $("#homeSearchBtn");

  function loadFavorites(page = 1) {
    const token = getToken();
    if (!token) {
      $("#list-buku-favorite").html("<div class='alert alert-warning'>Silakan login untuk melihat favorit.</div>");
      $("#pagination-buku").html("");
      return;
    }

    $.ajax({
      url: `${baseURL}/api/favorites?page=${page}&search=${encodeURIComponent(currentSearchFavorite || "")}`,
      headers: { Authorization: "Bearer " + token },
      success: function (response) {
        let html = "";

        if (!response || !response.data || !Array.isArray(response.data) || response.data.length === 0) {
          html = "<div class='alert alert-info text-center'>Tidak ada buku favorit ditemukan.</div>";
        } else {
          response.data.forEach((book) => {
            html += `
              <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                  <img src="${baseURL}/storage/${book.image}" 
                       class="card-img-top" 
                       style="height: 200px; object-fit: cover;"/>
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text text-truncate">${book.description || ''}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                      <button class="btn btn-primary btn-sm read-btn">
                        <i class="bi bi-book"></i> Baca
                      </button>
                      <i class="favorite-btn bi bi-heart-fill text-danger"
                         style="font-size: 1.4rem; cursor: pointer;"
                         data-id="${book.id}" 
                         title="Hapus dari Favorit"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;
          });
        }

        $("#list-buku-favorite").html(html);

        const currentPage = response.current_page || 1;
        const lastPage = response.last_page || 1;
        let paginationHtml = `<ul class="pagination justify-content-center">`;

        paginationHtml += `
          <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link page-btn" data-page="${currentPage - 1}">Prev</button>
          </li>
        `;

        for (let i = 1; i <= lastPage; i++) {
          paginationHtml += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
              <button class="page-link page-btn" data-page="${i}">${i}</button>
            </li>
          `;
        }

        paginationHtml += `
          <li class="page-item ${currentPage === lastPage ? "disabled" : ""}">
            <button class="page-link page-btn" data-page="${currentPage + 1}">Next</button>
          </li>
        `;
        paginationHtml += `</ul>`;

        $("#pagination-buku").html(paginationHtml);

        $(".page-btn").off("click").on("click", function () {
          const page = $(this).data("page");
          if (page >= 1 && page <= lastPage) {
            loadFavorites(page);
          }
        });

        $(".favorite-btn").off("click").on("click", function (e) {
          e.preventDefault();
          const $icon = $(this);
          const bookId = $icon.data("id");

          if (!token) {
            alert("Silakan login terlebih dahulu.");
            window.location.href = "/login";
            return;
          }

          $.ajax({
            url: `${baseURL}/api/books/${bookId}/favorite`,
            type: "POST",
            headers: { Authorization: "Bearer " + token },
            success: function (res) {
              alert(res.message || "Berhasil mengubah favorit!");
              loadFavorites(currentPage);
            },
            error: function (xhr) {
              if (xhr.status === 401) {
                localStorage.removeItem("token");
                alert("Sesi Anda telah berakhir. Silakan login kembali.");
                window.location.href = "/login";
                return;
              }
              let msg = "Gagal mengubah favorit.";
              if (xhr.responseJSON && xhr.responseJSON.message) msg = xhr.responseJSON.message;
              alert(msg);
            },
          });
        });
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          localStorage.removeItem("token");
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/login";
          return;
        }
        $("#list-buku-favorite").html("<div class='alert alert-danger'>Gagal memuat data favorit.</div>");
        $("#pagination-buku").html("");
      },
    });
  }

  $searchInput.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      currentSearchFavorite = $(this).val().trim();
      loadFavorites(1);
    }
  });

  $searchBtn.on("click", function (e) {
    e.preventDefault();
    currentSearchFavorite = $searchInput.val().trim();
    loadFavorites(1);
  });

  loadFavorites();
});