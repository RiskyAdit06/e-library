# Dokumentasi API E-Library

Berikut adalah dokumentasi endpoint API berdasarkan file `api.php`:

## Base URL

```
http://localhost:8000/api
```

---

## Authentication

Semua endpoint yang membutuhkan autentikasi harus menyertakan header:
```
Authorization: Bearer {token}
```
Token JWT didapat dari endpoint login.

---

## Endpoint API

### 1. AUTH

#### Register
- **Method:** POST
- **Endpoint:** `/register`
- **Description:** Registrasi user baru
- **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "Password123",
      "password_confirmation": "Password123"
    }
    ```
- **Success:** 200 OK + user data
- **Error:** 422 Validation error

#### Login
- **Method:** POST
- **Endpoint:** `/login`
- **Description:** Login user & mendapatkan JWT token
- **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "Password123"
    }
    ```
- **Success:** 200 OK + `{ "token": "...", ... }`
- **Error:** 401 Unauthorized

#### Logout
- **Method:** POST
- **Endpoint:** `/logout`
- **Description:** Logout dan invalidate token
- **Headers:** Authorization

#### Me (Get Current User)
- **Method:** GET
- **Endpoint:** `/me`
- **Description:** Mendapatkan profile user yang sedang login
- **Headers:** Authorization

#### Change Password
- **Method:** POST
- **Endpoint:** `/change-password`
- **Description:** Ganti password user login
- **Headers:** Authorization
- **Body:**
    ```json
    {
      "new_password": "NewPassword123"
    }
    ```

---

### 2. BOOKS

#### Get All Books
- **Method:** GET
- **Endpoint:** `/books`
- **Query:**
  - `search` (opsional): cari berdasarkan nama buku
  - `page` (opsional): nomor halaman
- **Description:** Mendapatkan semua buku dengan atau tanpa pencarian

#### Create Book (Admin Only)
- **Method:** POST
- **Endpoint:** `/books`
- **Headers:** Authorization, Content-Type: multipart/form-data
- **Body:** Form-data:
    - `name` (required)
    - `description` (required)
    - `image` (required: jpg/png/jpeg, max 2MB)
- **Description:** Tambah buku baru (hanya admin)

#### Update Book (Admin Only)
- **Method:** PUT
- **Endpoint:** `/books/{id}`
- **Headers:** Authorization, Content-Type: multipart/form-data
- **Body:** Form-data:
    - `name` (opsional)
    - `description` (opsional)
    - `image` (opsional)
- **Description:** Update buku tertentu (hanya admin)

#### Delete Book (Admin Only)
- **Method:** DELETE
- **Endpoint:** `/books/{id}`
- **Headers:** Authorization
- **Description:** Hapus buku (hanya admin)

---

### 3. FAVORITES

#### Toggle Favorite Book
- **Method:** POST
- **Endpoint:** `/books/{id}/favorite`
- **Headers:** Authorization
- **Description:** Membuat atau menghapus buku dari daftar favorit user login

#### Get Favorites List
- **Method:** GET
- **Endpoint:** `/favorites`
- **Headers:** Authorization
- **Query:**
  - `search` (opsional): filter buku favorit
  - `page` (opsional)
- **Description:** Mendapatkan daftar buku favorit user login

---

## Format Response

### Sukses
```json
{
  "message": "Berhasil",
  "data": {...}
}
```
atau
```json
{
  "message": "Berhasil",
  "token": "JWT_TOKEN"
}
```

### Error
```json
{
  "message": "Error message",
  "errors": {
    "field": ["Error detail"]
  }
}
```

---

## Status Code

- 200 OK : Berhasil
- 201 Created : Resource berhasil dibuat
- 401 Unauthorized : Tidak ada/invalid token JWT
- 403 Forbidden : Tidak berhak akses
- 404 Not Found : Resource tidak ditemukan
- 422 Unprocessable Entity : Validasi gagal

---

## Contoh cURL

**Register**
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123","password_confirmation":"Password123"}'
```

**Login**
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elibrary.com","password":"Admin123!"}'
```

**Get All Books**
```bash
curl -X GET http://localhost:8000/api/books
```

**Create Book**
```bash
curl -X POST http://localhost:8000/api/books \
  -H "Authorization: Bearer {token}" \
  -F "name=Buku Baru" \
  -F "description=Buku API" \
  -F "image=@/path/to/image.jpg"
```

**Add Favorite**
```bash
curl -X POST http://localhost:8000/api/books/1/favorite \
  -H "Authorization: Bearer {token}"
```

---

## Demo Account

### Admin
- **Email**: admin@elibrary.com
- **Password**: Admin123!

### User
- Register lewat endpoint `/register`

---

## Catatan
- Semua resource protected hanya bisa diakses jika login dan menyertakan token JWT di header.
- Endpoint untuk membuat, mengedit, dan menghapus buku hanya bisa diakses oleh user dengan role "admin".
- Hapus dan favorit buku hanya bisa diakses oleh user yang sudah login.

---

**Selamat menggunakan API E-Library!**
