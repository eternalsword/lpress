@extends($view_prefix . '.layouts.master')
@section('styles')
	@parent
@stop
@section('content')
	<h1>User Setup</h1>
	<div class='form'>
		{{ Form::open(array('route' => 'lpress-user-update')) }}
		<div class='text'>
			{{ Form::label('Username:') }}
			{{ Form::text('username') }}
		</div>
		<div class='text'>
			{{ Form::label('Password:') }}
			{{ Form::password('password') }}
		</div>
		<div class='text'>
			{{ Form::label('Verify Password:') }}
			{{ Form::password('verify_password') }}
		</div>
		<div class='submit'>
			{{ Form::submit('Submit') }}
		</div>
		{{ Form::close() }}
	</div>
@stop
@section('footer_scripts')
	@parent
@stop