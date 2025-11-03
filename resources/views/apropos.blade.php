@extends('layouts.app')


@section('content')

<div class="container">
    <h1>@lang('general.AboutPageHeader')</h1>

    <h4>@lang('general.AuthorName')</h4>

    <p><strong>@lang('general.CourseTitle1')</strong><br>
    @lang('general.CourseTitle2')</p>

    <h5>@lang('general.UsageStepsTitle')</h5>
    <ol>
        <li>@lang('general.UsageStep1')</li>
        <li>@lang('general.UsageStep2')</li>
        <li>@lang('general.UsageStep3')</li>
        <li>@lang('general.UsageStep4')</li>
        <li>@lang('general.UsageStep5')</li>
        <li>@lang('general.UsageStep6')</li>
    </ol>

    <h5>@lang('general.DBDiagramTitle')</h5>
    <pre style="background:#f8f9fa;border:1px solid #ddd;padding:10px;white-space:pre-wrap;">@lang('general.DBDiagram')</pre>

    <h5>@lang('general.ReferencesTitle')</h5>
    <p>@lang('general.References')</p>

    <a href="{{ url('/') }}" class="btn btn-secondary">@lang("general.RetourAccueil")</a>
</div>
@endsection
