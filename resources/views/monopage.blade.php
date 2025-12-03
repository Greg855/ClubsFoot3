<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    <script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        async
        defer></script>
</head>

<body>

    @php
        $user_auth_data = Auth::check() 
        ? [ 'isLoggedIn' => true, 'user' => Auth::user()] 
        : [ 'isLoggedIn' => false ];
    @endphp
    <script>
        window.laravel = JSON.parse(atob('{{ base64_encode(json_encode($user_auth_data)) }}'));
        window.laravel.locale = '{{ session("locale", "en") }}';
    </script>

    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>

</html>