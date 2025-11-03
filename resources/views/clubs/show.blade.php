@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex align-items-center mb-3">
                @if (!empty($club->image))
                    <img src="{{ asset('storage/' . $club->image) }}" alt="{{ $club->name }}" class="rounded me-3" style="width:96px; height:96px; object-fit:cover;" />
                @endif
                <div>
                    <h1 class="mb-0">{{ $club->name }}</h1>
                    <small class="text-muted">@lang("general.Creele"): {{ $club->created_at->format('Y-m-d H:i:s') }}</small>
                </div>
            </div>
            <div class="mb-3">
                <h4>@lang("general.StatEquipe"):</h4>
                <ul>
                    <li>@lang("general.MatchJoue"): {{ $club->matches_played }}</li>
                    <li>@lang("general.MatchGagne"): {{ $club->matches_won }}</li>
                    <li>@lang("general.MatchPerdu"): {{ $club->matches_lost }}</li>
                    <li>@lang("general.MatchNul"): {{ $club->matches_drawn }}</li>
                </ul>
            </div>

            <div class="buttons">
                @if (auth()->check() && ($club->user_id == auth()->user()->id || auth()->user()->role == 'admin'))
                <a href="{{ url('clubs/'. $club->id .'/edit') }}" class="btn btn-info">@lang("general.Modifier")</a>
                <form action="{{ url('clubs/'. $club->id) }}" method="POST" style="display: inline">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">@lang("general.Supprimer")</button>
                </form>
                @endif
                <a href="{{ url('/') }}" class="btn btn-info">@lang("general.RetourAccueil")</a>
                @if (auth()->check() && ($club->user_id == auth()->user()->id || auth()->user()->role == 'admin'))
                <a href="{{ url('joueurs/create?clubs_id=' . $club->id) }}" class="btn btn-success">@lang("general.ajouterJoueur")</a>
                @endif
                <p></p>
                <br><br>
            </div>
        </div>
    </div>
</div>
{{-- Section des joueurs --}}
<div class="container">
    <h2>@lang("general.Joueurs")</h2>
    @foreach ($club->joueurs as $joueur)
    <h3>@lang("general.JoueurNumero") {{ $joueur->id }}: {{ $joueur->name }}</h3>
    <h5><strong>@lang("general.Poste"): {{ $joueur->position }}</strong></h5>
    <p class="lead">@lang("general.Stat"): @lang("general.MatchJoue"): {{ $joueur->matches_played }}, @lang("general.Pays"): {{ $joueur->country }}</p>
    <div class="buttons">
        @if (auth()->check() && ($joueur->club->user_id == auth()->user()->id || auth()->user()->role == 'admin'))
        <form action="{{ url('joueurs/' . $joueur->id) }}" method="POST" style="display: inline">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">@lang("general.Supprimer")</button>
        </form>
        @endif
        <br><br>
    </div>
    @endforeach
</div>
@endsection