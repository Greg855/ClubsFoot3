@extends('layouts.app')

@section('content')

<div class="row">
    <div class="col-lg-10">
        <h2>@lang('general.ListeJoueurs')</h2>
    </div>
    <div class="col-lg-2">
        @auth
        <a class="btn btn-success" href="{{ url('joueurs/create') }}">@lang('general.ajouterJoueur')</a>
        @endauth
    </div>
</div>

@if ($message = Session::get('success'))
<div class="alert alert-success">
    <p>{{ $message }}</p>
</div>
@endif

@if ($message = Session::get('warning'))
<div class="alert alert-warning">
    <p>{{ $message }}</p>
</div>
@endif

<div class="container">
    <div class="row">
        @if($joueurs->isEmpty())
        <div class="col-12">
            <div class="alert alert-info">
                @auth
                @lang('general.NoPlayers')
                @else
                @lang('general.NoPlayersGuest')
                @endauth
            </div>
        </div>
        @endif

        @foreach ($joueurs as $index => $joueur)
        <div class="col-md-4">
            <div class="card card-body mb-3">
                <h2>{{ $joueur->name }}</h2>

                @if (auth()->check() && ($joueur->club->user_id == auth()->user()->id || auth()->user()->role == 'admin'))
                <div class="mt-2">
                    <form action="{{ url('joueurs/'.$joueur->id) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Êtes-vous sûr?')">@lang('general.Supprimer')</button>
                    </form>
                </div>
                @endif
            </div>
        </div>
        @endforeach
    </div>
</div>

@endsection