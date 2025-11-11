function parseJwt(token) {
    if (!token) return null;
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch(e) { return null; }
}

function isAdminToken(payload) {
    if (!payload) return false;
    if (payload.role && typeof payload.role === 'string' && payload.role.toLowerCase() === 'admin') return true;
    if (payload.is_admin === true || payload.is_admin === 1 || payload.is_admin === '1') return true;
    if (payload.admin === true || payload.admin === 1 || payload.admin === '1') return true;
    return false;
}

// Update Navbar
function updateNavbarAuth() {
    var token = getToken();
    var $navLoginBtn = $('#navLoginBtn');
    var $navLogoutBtn = $('#navLogoutBtn');
    var $adminUploadBtn = $('#adminUploadBtn');

    var isAdmin = false;
    if(token) {
        var payload = parseJwt(token);

        // ✅ Tambahan: cek apakah token sudah expired
        if (payload && payload.exp && Date.now() >= payload.exp * 1000) {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            token = null;
            $navLoginBtn.removeClass('d-none');
            $navLogoutBtn.addClass('d-none');
            if ($adminUploadBtn.length) $adminUploadBtn.addClass('d-none');
            return;
        }

        isAdmin = payload && (payload.role === 'admin' || payload.is_admin === true);

        $navLoginBtn.addClass('d-none');
        $navLogoutBtn.removeClass('d-none');
    } else {
        $navLoginBtn.removeClass('d-none');
        $navLogoutBtn.addClass('d-none');
    }

    if ($adminUploadBtn.length) {
        if(isAdmin) {
            $adminUploadBtn.removeClass('d-none');
            $adminUploadBtn.off('click').on('click', function() { window.location.href = '/admin/dashboard'; });
        } else {
            $adminUploadBtn.addClass('d-none');
            $adminUploadBtn.off('click');
        }
    }
}

// --- SEARCH SUPPORT START ---
function doHomeSearch(query) {
    $.ajax({
        url: '/api/books?search=' + encodeURIComponent(query || ''),
        method: 'GET',
        success: function(response) {
            var html = '';
            if (response && response.data && response.data.length > 0) {
                $.each(response.data, function(_, book) {
                    html += `
                        <div class="col-md-4">
                            <div class="card h-100">
                              <img src="/storage/${book.image}" class="card-img-top" style="height: 200px; object-fit: cover;"/>
                              <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${book.name}</h5>
                                <p class="card-text">${book.description}</p>
                                <div class="mt-auto d-flex justify-content-between align-items-center">
                                  <button class="btn btn-primary btn-lg read-btn" style="min-width:110px;">
                                    <i class="bi bi-book" style="margin-right:6px;"></i> Baca
                                  </button>
                                </div>
                              </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html = "<div class='col-12'><div class='alert alert-warning'>Buku tidak ditemukan.</div></div>";
            }
            if ($('#list-buku').length) {
                $('#list-buku').html(html);
            }
        },
        error: function() {
            if ($('#list-buku').length) {
                $('#list-buku').html("<div class='col-12'><div class='alert alert-danger'>Gagal memuat data buku.</div></div>");
            }
        }
    });
}

function setupHomeSearchInput() {
    var $searchInput = $('#homeSearchInput');
    if (!$searchInput.length) {
        $searchInput = $('[data-search-home], .home-search-input, input[type=search][name=search]').first();
    }
    var $searchBtn = $('#homeSearchBtn');
    if (!$searchBtn.length) {
        $searchBtn = $('[data-search-btn-home], .home-search-btn, button[type=submit][name=search]').first();
    }

    if ($searchInput.length) {
        $searchInput.off('keydown.homeSearch').on('keydown.homeSearch', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                doHomeSearch($searchInput.val());
            }
        });
    }

    if ($searchBtn.length && $searchInput.length) {
        $searchBtn.off('click.homeSearch').on('click.homeSearch', function(e) {
            e.preventDefault();
            doHomeSearch($searchInput.val());
        });
    }
}

// --- SEARCH SUPPORT END ---
var lastToken = getToken();
setInterval(function() {
    var currToken = getToken();
    if(currToken !== lastToken) {
        lastToken = currToken;
        updateNavbarAuth();
    }
}, 1000);

$(function() {
    var $navLogoutBtn = $('#navLogoutBtn');
    if($navLogoutBtn.length) {
        $navLogoutBtn.off('click.navLogout').on('click.navLogout', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/logout',
                type: 'POST',
                headers: { 'Authorization': 'Bearer ' + getToken() }
            }).always(function() {
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                updateNavbarAuth();
                window.location.href = '/';
            });
        });
    }
    updateNavbarAuth();

    setupHomeSearchInput();

    doHomeSearch('');
});