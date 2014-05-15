@extends('layouts.master')

@section('title')
@parent
:: Console
@stop

@section('content')
<div class='page-header'>
  <h1>Sample Datasets <small>Click to load and play</small></h1>
  <div class='btn-group'>
    {{ Form::button('Connect', array('class' => 'btn btn-default',
                                     'id' => 'connect')); }}
    {{ Form::button('Disconnect', array('class' => 'btn btn-default',
                                        'id' => 'disconnect')); }}
  </div>
  <div class='btn-group' data-toggle='buttons'>
    <label id='hello_world' class='btn btn-default dataset'>
      <input type='radio'> Hello World
    </label>
    <label id='database' class='btn btn-default dataset'>
      <input type='radio'> Database
    </label>
  </div>
</div>
{{ Form::textarea('orlyscript', '', array('disabled',
                                          'class' => 'form-control',
                                          'id' => 'orlyscript')); }}
<select id='function' class='form-control input-medium'></select>
{{ Form::text('args', '', array('class' => 'form-control',
                                'id' => 'args')); }}
{{ Form::button('Run', array('class' => 'btn btn-default',
                             'id' => 'run')); }}
<div class='panel panel-default'>
  <div class='panel-heading'>
    <h3 class='panel-title'><b>Log</b></h3>
  </div>
  {{ Form::textarea('log', '', array('disabled',
                                        'class' => 'form-control',
                                        'id' => 'log')); }}
</div>
@stop

