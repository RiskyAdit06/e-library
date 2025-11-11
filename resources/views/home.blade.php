<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'E-Library')</title>
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">
</head>
<body>

    {{-- Navbar --}}
    @include('layout.navbar')

    {{-- Hero Section --}}
    @if(!isset($showHero) || $showHero)
        @include('layout.hero')
    @endif

    {{-- Konten utama --}}
    <main>
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('layout.footer')

    {{-- JS --}}
    <script src="{{ asset('assets/js/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/helper.js') }}"></script>
    <script src="{{ asset('assets/js/pages/home.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script>
        const baseURL = "{{ url('/') }}";
    </script>
    @stack('scripts')
</body>
</html>