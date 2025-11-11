<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - E-Library</title>
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('assets/css/dataTables.bootstrap5.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/profile.css') }}">
</head>
<body>
     <!-- Navbar -->
    @include('layout.navbar')

    <!-- Hero Profile -->
    <section class="hero-profile">
        <div class="container">
            <h1 class="display-5 fw-bold mb-2"><i class="bi bi-person-circle"></i> Profile User</h1>
            <p class="lead">Kelola informasi akun Anda dan perbarui profile dengan mudah.</p>
        </div>
    </section>

    <!-- Konten Profile -->
    <div class="container">
        <div class="profile-card p-5">
            <h3 class="text-center mb-4 text-primary fw-bold">
                <i class="bi bi-pencil-square"></i> Edit Profile
            </h3>

            <form id="editProfileForm" autocomplete="off">
                <div class="row g-4">
                    <!-- Email -->
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label fw-semibold">
                            <i class="bi bi-envelope"></i> Email
                        </label>
                        <input type="email" class="form-control form-control-lg" id="email" required autocomplete="off" disabled>
                    </div>

                    <!-- Password Baru -->
                    <div class="col-md-6 mb-3 position-relative">
                        <label for="newPassword" class="form-label fw-semibold">
                            <i class="bi bi-lock-fill"></i> Password Baru
                        </label>
                        <div class="input-group">
                            <input type="password" class="form-control form-control-lg" id="newPassword"
                                   pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                                   title="Minimal 8 karakter, harus ada huruf besar, kecil, dan angka"
                                   autocomplete="new-password">
                            <span class="input-group-text bg-white" style="cursor:pointer;"
                                  onclick="togglePasswordVisibility('newPassword','eyeNew')">
                                <i id="eyeNew" class="bi bi-eye-slash"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Konfirmasi Password Baru -->
                    <div class="col-md-6 mb-3 position-relative">
                        <label for="confirmPassword" class="form-label fw-semibold">
                            <i class="bi bi-lock-fill"></i> Konfirmasi Password Baru
                        </label>
                        <div class="input-group">
                            <input type="password" class="form-control form-control-lg" id="confirmPassword"
                                   pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                                   title="Ulangi password baru Anda"
                                   autocomplete="new-password">
                            <span class="input-group-text bg-white" style="cursor:pointer;"
                                  onclick="togglePasswordVisibility('confirmPassword','eyeConfirm')">
                                <i id="eyeConfirm" class="bi bi-eye-slash"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary btn-lg fw-semibold px-5 py-3 me-3">
                        <i class="bi bi-save"></i> Simpan Perubahan
                    </button>
                    <button type="button" class="btn btn-secondary btn-lg fw-semibold px-5 py-3" onclick="cancelEdit()">
                        <i class="bi bi-x-circle"></i> Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    @include('layout.footer')

    {{-- Scripts --}}
    <script src="{{ asset('assets/js/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('assets/js/dataTables.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/helper.js') }}"></script>
    <script src="{{ asset('assets/js/pages/profile.js') }}"></script>
</body>
</html>