@extends('layouts.app')


@section('content')

    <h1>@lang("general.AjouterClub")</h1>
    @if ($message = Session::get('warning'))

        <div class="alert alert-warning">
            <p>{{ $message }}</p>
        </div>

    @endif

    <form action="{{ route('clubs.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="form-group mb-3">
            <label for="name">@lang("general.NomClub")</label>
            <input type="text" class="form-control" id="text" name="name">
        </div>

        <div class="form-group mb-3">
            <label for="city">@lang("general.VilleClub")</label>
            <input type="text" class="form-control" id="text" name="city">
        </div>

        <div class="form-group mb-3">
            <label for="matches_played">@lang("general.NbMatchesJoues")</label>
            <input type="text" class="form-control" id="text" name="matches_played">
        </div>

        <div class="form-group mb-3">
            <label for="matches_won">@lang("general.NbMatchesGagnes")</label>
            <input type="text" class="form-control" id="text" name="matches_won">
        </div>

        <div class="form-group mb-3">
            <label for="matches_lost">@lang("general.NbMatchesPerdus")</label>
            <input type="text" class="form-control" id="text" name="matches_lost">
        </div>

        <div class="form-group mb-3">
            <label for="matches_drawn">@lang("general.NbMatchNuls")</label>
            <input type="text" class="form-control" id="text" name="matches_drawn">
        </div>

        <div class="form-group mb-3">
            <label for="image">@lang("general.ImageClub")</label>
            <input type="file" class="form-control" name="image" accept="image/*">
        </div>
        <div class="form-group mb-3">
            <label>@lang('general.ImageClub') Preview</label>
            <div>
                <img id="imagePreview" src="#" alt="" style="display:none; max-width:220px; max-height:160px;" class="img-fluid img-thumbnail" />
            </div>
        </div>
        <button type="submit" class="btn btn-primary">@lang("general.Publier")</button>
        <a href="{{ url('/') }}" class="btn btn-info">@lang("general.RetourAccueil")</a>

    </form>

@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('input[type=file][name="image"]');
    const preview = document.getElementById('imagePreview');
    if (!input) return;
    input.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) {
            preview.style.display = 'none';
            preview.src = '#';
            return;
        }
        const reader = new FileReader();
        reader.onload = function (ev) {
            preview.src = ev.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    });
});
</script>
@endsection