$(document).ready(function() {
  let currentSearch = "";
  let favoriteIds = [];

  function loadFavoriteIds(token) {
    if (!token) return $.Deferred().resolve();
    return $.ajax({
      url: `${baseURL}/api/favorites`,
      headers: { Authorization: "Bearer " + token },
      success: function(res) {
        favoriteIds = res.data.map(b => b.id);
      },
      error: function() {
        favoriteIds = [];
      }
    });
  }

  function loadBooks(page = 1) {
    const token = getToken(); 

    $.when(loadFavoriteIds(token)).done(function() {
      const ajaxOptions = {
        url: `${baseURL}/api/books?page=${page}&search=${currentSearch}`,
        success: function(response) {
          // Render buku
          let html = "";
          response.data.forEach(book => {
            const isFavorite = favoriteIds.includes(book.id); 
            html += `
              <div class="col-md-4">
                <div class="card h-100">
                  <img src="${baseURL}/storage/${book.image}" class="card-img-top" style="height: 200px; object-fit: cover;"/>
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text">${book.description}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                      <button class="btn btn-primary btn-lg read-btn" style="min-width:110px;">
                        <i class="bi bi-book" style="margin-right:6px;"></i> Baca
                      </button>
                      <i class="favorite-btn ${isFavorite ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'}" 
                         style="font-size: 1.5rem; cursor: pointer;"
                         data-id="${book.id}" 
                         title="Favorit"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;
          });
          $("#list-buku").html(html);

          // Pagination
          let paginationHtml = `<ul class="pagination justify-content-center">`;
          const currentPage = response.current_page;
          const lastPage = response.last_page;

          paginationHtml += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
              <button class="page-link page-btn" data-page="${currentPage - 1}">Prev</button>
            </li>
          `;
          for (let i = 1; i <= lastPage; i++) {
            paginationHtml += `
              <li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link page-btn" data-page="${i}">${i}</button>
              </li>
            `;
          }
          paginationHtml += `
            <li class="page-item ${currentPage === lastPage ? 'disabled' : ''}">
              <button class="page-link page-btn" data-page="${currentPage + 1}">Next</button>
            </li>
          `;
          paginationHtml += `</ul>`;
          $("#pagination-buku").html(paginationHtml);

          // Pagination click
          $(".page-btn").off("click").on("click", function() {
            const page = $(this).data("page");
            if (page >= 1 && page <= lastPage) {
              loadBooks(page);
            }
          });

          // Favorite click
          $(".favorite-btn").off("click").on("click", function() {
            const $icon = $(this);
            const bookId = $icon.data("id");

            if (!token) {
              alert("Silakan login terlebih dahulu untuk menambahkan ke favorit.");
              return;
            }

            $.ajax({
              url: `${baseURL}/api/books/${bookId}/favorite`,
              type: "POST",
              headers: { Authorization: "Bearer " + token },
              success: function(res) {
                if (favoriteIds.includes(bookId)) {
                  favoriteIds = favoriteIds.filter(id => id !== bookId);
                } else {
                  favoriteIds.push(bookId);
                }

                $icon.toggleClass("bi-heart bi-heart-fill text-danger");

                alert(res.message || "Berhasil mengubah favorit!");
              },
              error: function(xhr) {
                let msg = "Gagal mengubah favorit.";
                if (xhr.responseJSON && xhr.responseJSON.message) msg = xhr.responseJSON.message;
                alert(msg);
              }
            });
          });
        
        },
        error: function() {
          $("#list-buku").html("<div class='alert alert-danger'>Gagal memuat data buku.</div>");
          $("#pagination-buku").html("");
        }
      };

      if (token) {
        ajaxOptions.headers = { Authorization: "Bearer " + token };
      }

      $.ajax(ajaxOptions);
    });
  }

  loadBooks();
});