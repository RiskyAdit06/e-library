<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Library - Login</title>
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="{{ asset('assets/css/pages/auth.css') }}" rel="stylesheet">
</head>
<body>
    <div class="login-card">
        <h2 class="text-center mb-4"><i class="fas fa-sign-in-alt me-2"></i>Login</h2>
        <form id="loginForm" autocomplete="off" novalidate>
            <div class="mb-3">
                <label for="email" class="form-label"><i class="fas fa-envelope me-1"></i>Email</label>
                <input type="email" name="email" class="form-control rounded-pill" id="email" required autofocus>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label"><i class="fas fa-lock me-1"></i>Password</label>
                <div class="input-group">
                    <input type="password" name="password" class="form-control rounded-start-pill" id="password" required minlength="8">
                    <span class="input-group-text eye-toggle" id="togglePassword">
                        <i class="fas fa-eye"></i>
                    </span>
                </div>
            </div>
            <div id="loginMessage"></div>
            <button type="submit" class="btn btn-primary btn-modern w-100" id="loginSubmitBtn">
                <i class="fas fa-sign-in-alt me-1"></i>Masuk
            </button>
        </form>

        <p class="mt-3 text-center">Belum punya akun? 
            <a href="{{ url('/register') }}">Daftar Akun</a>
        </p>
        <a href="{{ url('/') }}" class="btn btn-outline-secondary btn-modern w-100 mt-3">
            <i class="fas fa-home me-1"></i>Kembali ke Home
        </a>
    </div>

    <script>
        var baseURL = "{{ url('') }}";
    </script>
    <script src="{{ asset('assets/js/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/helper.js') }}"></script>
    <script src="{{ asset('assets/js/pages/auth.js') }}"></script>
</body>
</html>
