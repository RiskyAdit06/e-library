<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand fw-bold" href="{{ url('/') }}">
            <i class="bi bi-book-half"></i> E-Library
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link active" href="{{ url('/katalog') }}"><i class="bi bi-grid"></i> Katalog</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ url('/favorite') }}"><i class="bi bi-heart"></i> Favorit</a></li>
            </ul>
            <div class="d-flex align-items-center">
               <!-- Search -->
                <form class="d-flex me-3" id="searchForm">
                <div class="input-group">
                    <input type="text" class="form-control" id="homeSearchInput" placeholder="Cari buku..." aria-label="Search">
                    <button class="btn btn-outline-light" id="homeSearchBtn" type="button"><i class="bi bi-search"></i></button>
                </div>
                </form>
                
                <!-- Upload (Admin Only) -->
                <button id="adminUploadBtn" class="btn btn-light fw-semibold me-3 d-none">
                    <i class="bi bi-upload"></i> Upload
                </button>
                <!-- Profil -->
                <div class="dropdown">
                    <a class="btn btn-light fw-semibold dropdown-toggle" href="#" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i> Profil
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a class="dropdown-item" href="{{ url('/profile-user') }}"><i class="bi bi-pencil"></i> Edit Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item d-none" href="#" id="navLogoutBtn"><i class="bi bi-box-arrow-left"></i> Logout</a>
                            <a class="dropdown-item" href="{{ url('/login') }}" id="navLoginBtn"><i class="bi bi-box-arrow-right"></i> Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>