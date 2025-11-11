$(document).ready(function() {

    // ================================
    // VALIDASI EMAIL & PASSWORD
    // ================================
    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPassword(password) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    }

    // ================================
    // TOGGLE PASSWORD HANDLER
    // ================================
    $('#togglePassword').on('click', function () {
        let input = $('#password');
        let icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    $('#toggleRegisterPassword').on('click', function () {
        let input = $('#registerPassword');
        let icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    $('#toggleConfirmPassword').on('click', function () {
        let input = $('#confirmPassword');
        let icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // ================================
    // LOGIN HANDLER
    // ================================
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        $('#loginMessage').html('');
        $('#loginSubmitBtn').attr('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Masuk');

        const email = $('#email').val().trim();
        const password = $('#password').val();

        if (email === '') {
            $('#loginMessage').html('<div class="alert alert-danger mt-2">Email wajib diisi.</div>');
            $('#loginSubmitBtn').attr('disabled', false).html('<i class="fas fa-sign-in-alt me-1"></i>Masuk');
            return;
        } else if (!isValidEmail(email)) {
            $('#loginMessage').html('<div class="alert alert-danger mt-2">Email tidak valid.</div>');
            $('#loginSubmitBtn').attr('disabled', false).html('<i class="fas fa-sign-in-alt me-1"></i>Masuk');
            return;
        }

        if (password === '' || !isValidPassword(password)) {
            $('#loginMessage').html('<div class="alert alert-danger mt-2">Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, dan angka.</div>');
            $('#loginSubmitBtn').attr('disabled', false).html('<i class="fas fa-sign-in-alt me-1"></i>Masuk');
            return;
        }

        $.ajax({
            url: `${baseURL}/api/login`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                if (response.token) {
                    document.cookie = 'token=' + encodeURIComponent(response.token) + '; path=/; max-age=' + (60*60*24);
                    window.location.href = baseURL + '/';
                } else {
                    $('#loginMessage').html('<div class="alert alert-danger mt-2">Login gagal! Token tidak ditemukan.</div>');
                }
            },
            error: function(xhr) {
                $('#loginSubmitBtn').attr('disabled', false).html('<i class="fas fa-sign-in-alt me-1"></i>Masuk');
                let msg = "Gagal login. Silakan cek email dan password.";
                if (xhr.responseJSON) {
                    if (xhr.responseJSON.message) msg = xhr.responseJSON.message;
                    if (xhr.responseJSON.errors) {
                        let errs = '<ul class="mb-0">';
                        $.each(xhr.responseJSON.errors, function(field, messages) {
                            errs += '<li>' + messages[0] + '</li>';
                        });
                        errs += '</ul>';
                        msg = errs;
                    }
                }
                $('#loginMessage').html('<div class="alert alert-danger mt-2">' + msg + '</div>');
            },
            complete: function() {
                $('#loginSubmitBtn').attr('disabled', false).html('<i class="fas fa-sign-in-alt me-1"></i>Masuk');
            }
        });
    });

    // ================================
    // REGISTER HANDLER
    // ================================
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();

        $('#registerMessage').html('');
        $('#registerSubmitBtn').attr('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Daftar Akun');

        const email = $('#registerEmail').val().trim();
        const password = $('#registerPassword').val();
        const password_confirmation = $('#confirmPassword').val();

        if (email === '') {
            $('#registerMessage').html('<div class="alert alert-danger mt-2">Email wajib diisi.</div>');
            $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
            return;
        } else if (!isValidEmail(email)) {
            $('#registerMessage').html('<div class="alert alert-danger mt-2">Email tidak valid.</div>');
            $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
            return;
        }

        if (password === '' || !isValidPassword(password)) {
            $('#registerMessage').html('<div class="alert alert-danger mt-2">Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, dan angka.</div>');
            $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
            return;
        }

        if (password !== password_confirmation) {
            $('#registerMessage').html('<div class="alert alert-danger mt-2">Konfirmasi password tidak sama.</div>');
            $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
            return;
        }

        $.ajax({
            url: `${baseURL}/api/register`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password, password_confirmation }),
            success: function(response) {
                $('#registerMessage').html('<div class="alert alert-success mt-2">Registrasi berhasil! Anda dapat login sekarang.</div>');
                setTimeout(function() {
                    window.location.href = baseURL + '/login';
                }, 1200);
            },
            error: function(xhr) {
                $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
                let msg = "Gagal registrasi. Silakan cek ulang data.";
                if (xhr.responseJSON) {
                    if (xhr.responseJSON.message) msg = xhr.responseJSON.message;
                    if (xhr.responseJSON.errors) {
                        let errs = '<ul class="mb-0">';
                        $.each(xhr.responseJSON.errors, function(field, messages) {
                            errs += '<li>' + messages[0] + '</li>';
                        });
                        errs += '</ul>';
                        msg = errs;
                    }
                }
                $('#registerMessage').html('<div class="alert alert-danger mt-2">' + msg + '</div>');
            },
            complete: function() {
                $('#registerSubmitBtn').attr('disabled', false).html('<i class="fas fa-user-plus me-1"></i>Daftar Akun');
            }
        });
    });

});