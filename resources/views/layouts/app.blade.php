@php $locale = session()->get('locale'); @endphp
<!doctype html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- JQuery -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('/images/premierleague.webp') }}" width="80px" height="70px">@lang("general.PremierLeague")
                </a>
                <div class="car-body">
                    <form action="{{ route('search') }}" method="GET">
                        @csrf
                        <div class="form-group">
                            <input type="text" class="typeahead form-control" id="club_search" name="query"
                                placeholder="@lang("general.Rechercher")...">
                            <button type="submit" class="btn btn-primary">@lang("general.Rechercher")</button>
                        </div>
                    </form>
                    <script type="text/javascript">
                        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                        $(document).ready(function() {
                            $('#club_search').autocomplete({
                                source: function(request, response) {
                                    $.ajax({
                                        url: "{{ route('autocomplete') }}",
                                        type: 'POST',
                                        dataType: "json",
                                        data: {
                                            _token: CSRF_TOKEN,
                                            search: request.term
                                        },
                                        success: function(data) {
                                            response(data);
                                        }
                                    });
                                },
                                select: function(event, ui) {
                                    $('#club_search').val(ui.item.label);
                                    window.location.href = "{{ url('clubs') }}/" + ui.item.value;
                                    return false;
                                }
                            });
                        });
                    </script>
                </div>

                <div class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="{{ asset('/images/' . session('locale', 'en') . '.png') }}" width="30px" height="20px"> @lang("general.Langue")
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                            <li><a class="dropdown-item" href="{{ url('lang/fr') }}"><img src="{{asset('/images/fr.png')}}" width="30px" height="20px" alt="Français"> Français</a></li>
                            <li><a class="dropdown-item" href="{{ url('lang/en') }}"><img src="{{asset('/images/en.png')}}" width="30px" height="20px" alt="English"> English</a></li>
                            <li><a class="dropdown-item" href="{{ url('lang/jp') }}"><img src="{{asset('/images/jp.png')}}" width="30px" height="20px" alt="日本語"> 日本語</a></li>
                        </ul>
                    </li>
                    @guest
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('/login')}}">@lang("general.Connexion")</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('/register')}}">@lang("general.Inscription")</a>
                    </li>
                    @else
                    <li class="nav-item">
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                        <a class="nav-link" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">@lang("general.Deconnexion")</a>
                    </li>
                    @endguest
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('/apropos')}}">@lang("general.Apropos")</a>
                    </li>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
    @yield('scripts')
</body>

</html>