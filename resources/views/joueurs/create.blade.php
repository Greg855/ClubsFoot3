@php $countries = [
'Afghanistan','Albanie','Algérie','Andorre','Angola','Antigua-et-Barbuda','Argentine',
'Arménie','Australie','Autriche','Azerbaïdjan','Bahamas','Bahreïn','Bangladesh',
'Barbade','Biélorussie','Belgique','Belize','Bénin','Bhoutan','Bolivie','Bosnie-Herzégovine',
'Botswana','Brésil','Brunéi','Bulgarie','Burkina Faso','Burundi','Cap-Vert','Cambodge',
'Cameroun','Canada','République centrafricaine','Tchad','Chili','Chine','Colombie','Comores',
'République du Congo','République démocratique du Congo','Costa Rica','Croatie','Cuba','Chypre',
'République tchèque','Danemark','Djibouti','Dominique','République dominicaine','Équateur','Égypte',
'Salvador','Guinée équatoriale','Érythrée','Estonie','Eswatini','Éthiopie','Fidji','Finlande',
'France','Gabon','Gambie','Géorgie','Allemagne','Ghana','Grèce','Grenade','Guatemala','Guinée',
'Guinée-Bissau','Guyana','Haïti','Honduras','Hongrie','Islande','Inde','Indonésie','Iran','Irak',
'Irlande','Italie','Jamaïque','Japon','Jordanie','Kazakhstan','Kenya','Kiribati','Koweït',
'Kirghizistan','Laos','Lettonie','Liban','Lesotho','Liberia','Libye','Liechtenstein','Lituanie',
'Luxembourg','Madagascar','Malawi','Malaisie','Maldives','Mali','Malte','Îles Marshall','Mauritanie',
'Maurice','Mexique','Micronésie','Moldavie','Monaco','Mongolie','Monténégro','Maroc','Mozambique',
'Myanmar','Namibie','Nauru','Népal','Pays-Bas','Nouvelle-Zélande','Nicaragua','Niger','Nigeria',
'Corée du Nord','Macédoine du Nord','Norvège','Oman','Pakistan','Palaos','Palestine','Panama',
'Papouasie-Nouvelle-Guinée','Paraguay','Pérou','Philippines','Pologne','Portugal','Qatar',
'Roumanie','Russie','Rwanda','Saint-Christophe-et-Niévès','Sainte-Lucie',
'Saint-Vincent-et-les-Grenadines','Samoa','Saint-Marin','Sao Tomé-et-Principe','Arabie saoudite',
'Sénégal','Serbie','Seychelles','Sierra Leone','Singapour','Slovaquie','Slovénie','Îles Salomon',
'Somalie','Afrique du Sud','Corée du Sud','Soudan du Sud','Espagne','Sri Lanka','Soudan','Suriname',
'Suède','Suisse','Syrie','Tadjikistan','Tanzanie','Thaïlande','Timor-Leste','Togo','Tonga',
'Trinité-et-Tobago','Tunisie','Turquie','Turkménistan','Tuvalu','Ouganda','Ukraine',
'Émirats arabes unis','Royaume-Uni','États-Unis','Uruguay','Ouzbékistan','Vanuatu','Vatican',
'Venezuela','Vietnam','Yémen','Zambie','Zimbabwe'
]; @endphp

@php $postes = [
'Attaquant','Défenseur','Milieu de terrain','Gardien de but']; 
@endphp

@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h2>@lang('general.AjoutNouveauJoueur')</h2>
        </div>
    </div>

    @if ($message = Session::get('warning'))
    <div class="alert alert-warning">
        <p>{{ $message }}</p>
    </div>
    @endif

    <form action="{{ route('joueurs.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        @if(isset($club))
        <input type="hidden" name="clubs_id" value="{{ $club->id }}">
        @endif

        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>@lang('general.NomJoueur')</strong>
                    <input type="text" name="name" class="form-control" placeholder=@lang('general.NomJoueur') value="{{ old('name') }}">
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>@lang('general.Position'):</strong>
                    <select name="position" class="form-control">
                        <option value="">@lang('general.SelectionerPosition')</option>
                        @foreach($postes as $poste)
                        <option value="{{ $poste }}" {{ old('poste') == $poste ? 'selected' : '' }}>
                            {{ __("general.$poste") }}
                        </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>@lang('general.Pays'):</strong>
                    <select name="country" class="form-control">
                        <option value="">@lang('general.SelectionnerPays')</option>
                        @foreach($countries as $country)
                        <option value="{{ $country }}" {{ old('country') == $country ? 'selected' : '' }}>
                            {{ __("general.$country") }}
                        </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>@lang('general.MatchsJoues'):</strong>
                    <input type="number" name="matches_played" class="form-control" placeholder=@lang('general.NombreMatchsJoues') value="{{ old('matches_played') }}">
                </div>
            </div>

            @if(!isset($club))
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>@lang('general.Club'):</strong>
                    <select name="clubs_id" class="form-control">
                        <option value="">@lang('general.SelectionnerClub')</option>
                        @foreach($clubs as $clubOption)
                        <option value="{{ $clubOption->id }}" {{ old('clubs_id') == $clubOption->id ? 'selected' : '' }}>
                            {{ $clubOption->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
            </div>
            @endif

            <div class="form-group mb-3">
                <label for="image">@lang('general.ImageJoueur'):</label>
                <input type="file" class="form-control" name="image" accept="image/*">
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary">@lang('general.Ajouter')</button>
                <a class="btn btn-secondary" href="{{ isset($club) ? route('clubs.show', $club->id) : route('joueurs.index') }}">@lang('general.Retour')</a>
            </div>
        </div>
    </form>
</div>

@endsection