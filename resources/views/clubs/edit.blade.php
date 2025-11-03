@extends('layouts.app')

@section('content')
	<h1>@lang("general.modifierClub")</h1>
	@if ($message = Session::get('warning'))
		<div class="alert alert-warning">
			<p>{{ $message }}</p>
		</div>
	@endif

	<form action="{{ url('clubs/' . $club->id) }}" method="POST" enctype="multipart/form-data">
		@csrf
		@method('PATCH')
		<div class="form-group mb-3">
			<label for="name">@lang("general.NomClub")</label>
			<input type="text" class="form-control" name="name" value="{{ old('name', $club->name) }}">
		</div>
		<div class="form-group mb-3">
			<label for="city">@lang("general.VilleClub")</label>
			<input type="text" class="form-control" name="city" value="{{ old('city', $club->city) }}">
		</div>
		<div class="form-group mb-3">
			<label for="matches_played">@lang("general.NbMatchesJoues")</label>
			<input type="text" class="form-control" name="matches_played" value="{{ old('matches_played', $club->matches_played) }}">
		</div>
		<div class="form-group mb-3">
			<label for="matches_won">@lang("general.NbMatchesGagnes")</label>
			<input type="text" class="form-control" name="matches_won" value="{{ old('matches_won', $club->matches_won) }}">
		</div>
		<div class="form-group mb-3">
			<label for="matches_lost">@lang("general.NbMatchesPerdus")</label>
			<input type="text" class="form-control" name="matches_lost" value="{{ old('matches_lost', $club->matches_lost) }}">
		</div>
		<div class="form-group mb-3">
			<label for="matches_drawn">@lang("general.NbMatchNuls")</label>
			<input type="text" class="form-control" name="matches_drawn" value="{{ old('matches_drawn', $club->matches_drawn) }}">
		</div>
		
		<div class="form-group mb-3">
			<label for="image">@lang('general.ImageClub')</label>
			<input type="file" class="form-control" name="image" accept="image/*">
			@if($club->image)
				<div class="mt-2">
					<img src="{{ asset('storage/' . $club->image) }}" alt="Image du club" style="max-width:150px;">
				</div>
			@endif
		</div>
		
		<button type="submit" class="btn btn-primary">@lang("general.maj")</button>
		<a href="{{ url('/') }}" class="btn btn-info">@lang("general.RetourAccueil")</a>
	</form>
@endsection
