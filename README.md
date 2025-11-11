# E-Library Application

Aplikasi perpustakaan digital berbasis web yang dibangun dengan Laravel 8. Aplikasi ini menyediakan fitur manajemen buku, sistem favorit, serta autentikasi pengguna dengan JWT. Sistem dibangun dengan dua jalur utama: Web (routes/web.php) untuk tampilan frontend dan interaksi pengguna biasa, serta API (routes/api.php) yang digunakan untuk komunikasi data, misal melalui frontend JS maupun pengembangan aplikasi eksternal.

## 🚀 Fitur Utama

- ✅ Sistem Autentikasi (Register, Login, Logout)
- ✅ Manajemen Buku (CRUD) untuk Admin
- ✅ Sistem Favorit Buku
- ✅ Pencarian Buku
- ✅ Dashboard Admin
- ✅ API RESTful dengan JWT Authentication
- ✅ Frontend Web Interface

## 📋 Persyaratan Sistem

- PHP >= 7.3 atau >= 8.0
- Composer
- MySQL/MariaDB (atau langsung gunakan database yang sudah tersedia di repo ini)
- Web Server (Apache/Nginx) atau PHP Built-in Server

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone (https://github.com/RiskyAdit06/e-library.git)
cd e-library
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install
```

### 3. Konfigurasi Environment

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Setup Database

Untuk database, kamu tidak perlu membuat database dari awal. File database bawaan sudah disediakan dengan nama `db_elubrary.sql` di direktori utama (luar folder project). Cukup import file tersebut ke MySQL kamu, lalu sesuaikan konfigurasi `.env` agar menggunakan database `db_elubrary`. Dengan begitu, aplikasi bisa langsung digunakan tanpa perlu migrate/seeder manual.

Jika ingin setup database secara manual, jalankan perintah berikut:

```bash
# Jalankan migration
php artisan migrate

# Jalankan seeder untuk membuat admin default
php artisan db:seed --class=AdminSeeder
```

### 5. Setup Storage Link

```bash
php artisan storage:link
```

### 6. Konfigurasi JWT

```bash
php artisan jwt:secret
```

### 1. Jalankan Web Server (untuk web)

```bash
php -S 127.0.0.1:8080 -t public 
```

### 2. Jalankan Web Server (untuk API)

```bash
php artisan serve
```

Aplikasi (tampilan web dan endpoint API) akan berjalan di `http://localhost:8000/`

- **Akses Web**: Buka `http://localhost:8000` di browser untuk menggunakan aplikasi.
- **Akses API**: Endpoint API tersedia di URL yang diawali dengan `/api`, misalnya `http://localhost:8000/api/books`. Gunakan Postman atau fetch/ajax dari frontend/JS untuk mengakses API.

## 📚 Dokumentasi API

Lihat [DOCUMENTATION.md](DOCUMENTATION.md) untuk dokumentasi API lengkap, contoh request, serta penjelasan endpoint di `routes/api.php`.

## 🔑 Akun Demo

### Admin
- **Email:** `admin@elibrary.com`
- **Password:** `Admin123!`

### User
Anda dapat membuat akun user baru melalui halaman register (web) atau endpoint API register.

## 🛠️ Teknologi yang Digunakan

- **Backend:** Laravel 8
- **Authentication:** JWT (tymon/jwt-auth)
- **Database:** MySQL _(bisa langsung import file `db_elibrary.sql` yang tersedia)_
- **Frontend:** Blade Templates, jQuery, Bootstrap

## 🙏 Acknowledgments

- Laravel Framework
- JWT Auth Package
- Bootstrap
- jQuery
