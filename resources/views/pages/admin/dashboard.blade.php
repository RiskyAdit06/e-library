<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - E-Library</title>
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('assets/css/dataTables.bootstrap5.min.css') }}">
    <link href="{{ asset('assets/css/pages/admin/dashboard.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    {{-- Navbar --}}
    @include('layout.navbar')

    {{-- Hero Admin --}}
    <section class="hero-admin">
        <div class="container">
            <h1 class="display-5 fw-bold mb-2"><i class="bi bi-gear-wide-connected"></i> Admin Dashboard</h1>
            <p class="lead">Kelola konten e-library dengan mudah. Upload, edit, dan hapus buku untuk pengguna.</p>
        </div>
    </section>

    {{-- Konten Admin --}}
    <div class="container my-4">
        <div class="alert alert-info text-center admin-card p-3 mb-4">
            <i class="bi bi-info-circle"></i> <strong>Akses Admin:</strong> Halaman ini hanya untuk User dengan role Admin.
        </div>

        {{-- Form Upload --}}
        <div class="admin-card p-4 mb-4">
            <h3 class="text-center mb-3 text-primary fw-bold"><i class="bi bi-cloud-upload"></i> Upload Buku Baru</h3>
            <form id="uploadForm" enctype="multipart/form-data">
                @csrf
                <div class="row g-3">
                    <div class="col-md-4">
                        <label for="image" class="form-label fw-semibold">Gambar Buku</label>
                        <input type="file" class="form-control" id="image" name="image" accept="image/*" required>
                    </div>
                    <div class="col-md-4">
                        <label for="namaBuku" class="form-label fw-semibold">Nama Buku</label>
                        <input type="text" class="form-control" id="namaBuku" name="namaBuku" required>
                    </div>
                    <div class="col-md-4">
                        <label for="deskripsi" class="form-label fw-semibold">Deskripsi</label>
                        <textarea class="form-control" id="deskripsi" name="deskripsi" rows="1" required></textarea>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary fw-semibold"><i class="bi bi-upload"></i> Upload</button>
                </div>
            </form>
        </div>

        {{-- Tabel Buku --}}
        <div class="admin-card p-4">
            <h3 class="text-center mb-3 text-primary fw-bold"><i class="bi bi-list-check"></i> Daftar Buku</h3>
            <div class="table-responsive">
                <table id="bookTable" class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Gambar</th>
                            <th>Nama Buku</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    {{-- Modal Edit --}}
    <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Edit Buku</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm" enctype="multipart/form-data">
                        <input type="hidden" id="editBookId">
                        <div class="mb-3">
                            <label for="editNamaBuku" class="form-label">Nama Buku</label>
                            <input type="text" class="form-control" id="editNamaBuku" required>
                        </div>
                        <div class="mb-3">
                            <label for="editDeskripsi" class="form-label">Deskripsi</label>
                            <textarea class="form-control" id="editDeskripsi" rows="2" required></textarea>
                        </div>
                        <div class="mb-3 edit-image-group"></div>
                        <div class="d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary fw-semibold" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary fw-semibold">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {{-- Modal Delete --}}
    <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">Konfirmasi Hapus</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <p>Apakah yakin ingin menghapus buku <span id="deleteBookName" class="fw-bold"></span>?</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Hapus</button>
                </div>
            </div>
        </div>
    </div>

    {{-- Footer --}}
    @include('layout.footer')

    {{-- Scripts --}}
    <script src="{{ asset('assets/js/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('assets/js/dataTables.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/helper.js') }}"></script>
    <script src="{{ asset('assets/js/pages/admin/dashboard.js') }}"></script>
</body>
</html>