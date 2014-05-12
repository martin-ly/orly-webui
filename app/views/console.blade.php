@extends('layouts.master')

@section('title')
@parent
:: Console
@stop

@section('content')
<div class='form-group'>
  {{ Form::label('OrlyScript:'); }}
  {{ Form::textarea('query', 'new session;', array('disabled',
                                                   'class' => 'form-control',
                                                   'id' => 'query')); }}
</div>
<div class='form-group'>
  {{ Form::label('Result:'); }}
  {{ Form::textarea('reuslt', '', array('disabled',
                                        'class' => 'form-control',
                                        'id' => 'result')); }}
</div>
<div class='btn-group'>
  {{ Form::button('Connect', array('class' => 'btn btn-default',
                                   'id' => 'connect')); }}
  {{ Form::button('Disconnect', array('disabled',
                                      'class' => 'btn btn-default',
                                      'id' => 'disconnect')); }}
</div>
<div class='btn-group'>
  {{ Form::button('Run', array('disabled',
                               'class' => 'btn btn-default',
                               'id' => 'run')); }}
</div>
@stop

