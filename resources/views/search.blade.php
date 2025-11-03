@extends('layouts.app')

@section('content')
<div class="container">
    <h2>@lang('general.RechercheClubs')</h2>
    <p>@lang('general.ResultatsRecherche') : <strong>{{ $query }}</strong></p>

    @if($clubs->isEmpty())
    <div class="alert alert-info">
        @lang('general.NoClubsFound')
    </div>
    @else
    <div class="row">
        @foreach ($clubs as $index => $club)
        <div class="col-md-4">
            <div class="card card-body">
                <div class="d-flex align-items-center">
                    @if (!empty($club->image))
                    <a href="{{ url('clubs/' . $club->id) }}" class="me-3 d-block" style="width:64px; height:64px;">
                        <img src="{{ asset('storage/' . $club->image) }}" alt="{{ $club->name }}" style="width:64px; height:64px; object-fit:cover;" class="img-thumbnail" />
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
    @endif
</div>

@endsection
