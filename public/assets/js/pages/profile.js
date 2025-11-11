function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function getToken() {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
}

function checkTokenExpiration() {
    const token = getToken();
    if (token) {
        const payload = parseJwt(token);
        if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            alert('Sesi login Anda telah berakhir. Silakan login kembali.');
            window.location.href = '/login';
            return false;
        }
        return true;
    } else {
        window.location.href = '/login';
        return false;
    }
}

function fetchUserProfile() {
    if (!checkTokenExpiration()) return;

    const token = getToken();
    $.ajax({
        url: '/api/me',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        success: function (response) {
            if (response && response.email) {
                $('#email').val(response.email);
            }
    
            $('#currentPassword').val('');
            $('#currentPassword').hide();
            $("label[for='currentPassword']").hide();
            $("#eyeOld").closest('.input-group-text').hide();
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                alert('Sesi Anda telah berakhir. Silakan login ulang.');
                window.location.href = '/login';
            } else {
                alert('Gagal memuat data profil pengguna.');
            }
        }
    });
}

function ensureConfirmPasswordField() {
    if ($('#confirmPassword').length === 0) {
        var $newPasswordGroup = $('#newPassword').closest('.input-group').parent();
        var confirmInput = `
            <div class="col-md-12 mb-3 position-relative">
                <label for="confirmPassword" class="form-label fw-semibold">
                    <i class="bi bi-lock-fill"></i> Konfirmasi Password Baru
                </label>
                <div class="input-group">
                    <input type="password" class="form-control form-control-lg" id="confirmPassword" placeholder="Ulangi password baru">
                    <span class="input-group-text bg-white" style="cursor:pointer;"
                        onclick="togglePasswordVisibility('confirmPassword','eyeConfirm')">
                        <i id="eyeConfirm" class="bi bi-eye-slash"></i>
                    </span>
                </div>
            </div>
        `;
        $newPasswordGroup.after(confirmInput);
    }
}

$('#editProfileForm').on('submit', function (e) {
    e.preventDefault();
    ensureConfirmPasswordField();

    var newPassword = $('#newPassword').val().trim();
    var confirmPassword = $('#confirmPassword').val().trim();
    var email = $('#email').val().trim();

    // --- validasi password ---
    if (newPassword && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(newPassword)) {
        alert('Password baru harus minimal 8 karakter, dengan huruf besar, kecil, dan angka.');
        return;
    }

    if (newPassword) {
        if (!confirmPassword) {
            alert('Silakan konfirmasi password baru Anda.');
            $('#confirmPassword').focus();
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('Konfirmasi password tidak sesuai dengan password baru.');
            $('#confirmPassword').focus();
            return;
        }

        // Kirim request ubah password
        if (!checkTokenExpiration()) return;
        var token = getToken();

        $.ajax({
            url: '/api/change-password',
            method: 'POST',
            contentType: 'application/json',
            headers: { Authorization: 'Bearer ' + token },
            data: JSON.stringify({ new_password: newPassword }),
            success: function () {
                $('#newPassword').val('');
                $('#confirmPassword').val('');
                alert('Password berhasil diubah!');
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    alert('Sesi Anda telah berakhir. Silakan login ulang.');
                    window.location.href = '/login';
                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    alert('Gagal mengganti password: ' + xhr.responseJSON.message);
                } else {
                    alert('Terjadi kesalahan saat mengganti password.');
                }
            }
        });
    } 
    else {
        // Di sini kita tidak ubah apa pun kalau tidak isi password
        alert('Tidak ada perubahan yang disimpan.');
    }
});


function cancelEdit() {
    $('#editProfileForm')[0].reset();
    if ($('#confirmPassword').length) {
        $('#confirmPassword').val('');
    }
    alert('Perubahan dibatalkan.');
}

function togglePasswordVisibility(id, iconId) {
    var $input = $('#' + id);
    var $icon = $('#' + iconId);
    if ($input.attr('type') === "password") {
        $input.attr('type', 'text');
        $icon.removeClass("bi-eye-slash").addClass("bi-eye");
    } else {
        $input.attr('type', 'password');
        $icon.removeClass("bi-eye").addClass("bi-eye-slash");
    }
}

$(document).ready(function () {
    fetchUserProfile();
    ensureConfirmPasswordField();
});