@extends('layouts.app')

@section('content')
    <h1>Modifier le joueur</h1>
    @if ($message = Session::get('warning'))
        <div class="alert alert-warning">
            <p>{{ $message }}</p>
        </div>
    @endif

    <form action="{{ url('joueurs/' . $joueur->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PATCH')
        <div class="form-group mb-3">
            <label for="name">Nom du joueur:</label>
            <input type="text" class="form-control" name="name" value="{{ old('name', $joueur->name) }}">
        </div>
        <div class="form-group mb-3">
            <label for="position">Poste:</label>
            <input type="text" class="form-control" name="position" value="{{ old('position', $joueur->position) }}">
        </div>
        <div class="form-group mb-3">
            <label for="matches_played">Matches joués:</label>
            <input type="text" class="form-control" name="matches_played" value="{{ old('matches_played', $joueur->matches_played) }}">
        </div>
        <div class="form-group mb-3">
            <label for="country">Pays:</label>
            <input type="text" class="form-control" name="country" value="{{ old('country', $joueur->country) }}">
        </div>
        <div class="form-group mb-3">
            <label for="clubs_id">Club:</label>
            <input type="text" class="form-control" name="clubs_id" value="{{ old('clubs_id', $joueur->clubs_id) }}">
        </div>
        <div class="form-group mb-3">
            <label for="image">Image du joueur :</label>
            <input type="file" class="form-control" name="image" accept="image/*">
            @if($joueur->image)
                <div class="mt-2">
                    <img src="{{ asset('images/' . $joueur->image) }}" alt="Image du joueur" style="max-width:150px;">
                </div>
            @endif
        </div>
        <button type="submit" class="btn btn-primary">Modifier</button>
        <a href="{{ url('/') }}" class="btn btn-info">@lang("general.RetourAccueil")</a>
    </form>
@endsection
