@extends('layouts.app')

@section('content')

<div class="row">
    <p>@lang("general.Voici equipes")</p>
    <div class="col-lg-10">
        <h2>@lang("general.ListeClub")</h2>
    </div>

    <div class="col-lg-2">
        @if (auth()->check())
        <a class="btn btn-creer" href="{{ url('clubs/create') }}">@lang("general.AjouterClub")</a>
        @endif
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
        @foreach ($clubs as $index => $club)
        <div class="col-md-4">
            <div class="card card-body club-card">
                <div class="d-flex align-items-center">
                    @if (!empty($club->image))
                        <a href="{{ url('clubs/' . $club->id) }}" class="me-3 d-block club-thumb">
                            <img src="{{ asset('storage/' . $club->image) }}" alt="{{ $club->name }}" class="img-thumbnail" />
                        </a>
                    @endif
                    <div>
                        <h4 class="mb-1"><a href="{{ url('clubs/' . $club->id) }}">{{ $club->name }}</a></h4>
                        <div class="text-muted">{{ $club->city }}</div>
                    </div>
                </div>
                <div>
                    @if (auth()->check() && ($club->user_id == auth()->user()->id || auth()->user()->role == 'admin'))
                    <a href="{{ url('clubs/' . $club->id . '/edit') }}" class="btn btn-info btn-sm ms-2">@lang("general.Modifier")</a>
                    <form action="{{ url('clubs/' . $club->id) }}" method="POST" style="display:inline-block; margin-left:5px;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm">@lang("general.Supprimer")</button>
                    </form>
                    @endif
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>


@endsection