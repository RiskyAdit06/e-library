@extends('home')

@section('title', 'Katalog Buku')

@section('hero')

@endsection

@section('content')
<div class="container mt-5" id="katalog">
    <h2 class="text-center mb-4 text-primary fw-bold">
        <i class="bi bi-bookshelf"></i> Katalog Buku
    </h2>

    <div class="row g-4" id="list-buku"></div>
    <div id="pagination-buku" class="my-4 d-flex justify-content-center"></div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/pages/home.js') }}"></script>
<script src="{{ asset('assets/js/pages/book.js') }}"></script>
@endpush
