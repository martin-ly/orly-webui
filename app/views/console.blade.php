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

