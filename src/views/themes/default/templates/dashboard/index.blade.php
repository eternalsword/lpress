@extends($view_prefix . '.layouts.dashboard')
@section('styles')
	@parent
@stop
@section('content')
	@parent
	<h2>Welcome, {{ $user->username }} {{ HTML::linkRoute('lpress-logout', 'Logout') }}</h2>
@stop
@section('footer_scripts')
	@parent
	{{ HTML::asset('js', 'compiled/dashboard/ready.js') }}
@stop