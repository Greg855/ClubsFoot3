<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
</head>
<body>

    @if (Auth::check())
        @php
            $user_auth_data = [
                'isLoggedIn' => true,
                'user' => Auth::user(),
                ];
        @endphp
    @else
        @php
            $user_auth_data = [
                'isLoggedIn' => false,
            ];
        @endphp
    @endif
    <script>
        window.laravel = JSON.parse(atob('{{ base64_encode(json_encode($user_auth_data)) }}'));
    </script>

    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>

</html>