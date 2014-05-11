@extends('layouts.master')

@section('title')
@parent
:: Console
@stop

@section('content')
<div>
  {{ Form::textarea('query', 'Hello World!'); }}
</div>
<div>
  {{ Form::submit('Run'); }}
</div>
@stop

@section('script')
@parent
{{ HTML::script('js/console.js'); }}
@stop

