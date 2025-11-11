@extends('home')

@section('title', 'Favorite Buku')

@section('hero')

@endsection

@section('content')
<div class="container mt-5" id="favorite">
    <h2 class="text-center mb-4 text-primary fw-bold">
        <i class="bi bi-heart"></i> Favorite Buku
    </h2>

    <div class="row g-4" id="list-buku-favorite"></div>
    <div id="pagination-buku" class="my-4 d-flex justify-content-center"></div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/helper.js') }}"></script>
<script src="{{ asset('assets/js/pages/favorite.js') }}"></script>
@endpush