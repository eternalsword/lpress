<?php namespace EternalSword\LPress;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpKernel\Exception\HttpException;

require_once PATH . '/helpers/ssl.php';

$route_prefix = (new PrefixGenerator)->getPrefix();
$dashboard_route = '+' . Config::get('l-press::dashboard_route');

// filtering placement thanks to http://markvaneijk.com/minify-the-html-output-in-laravel-4
App::after(function($request, $response) {
	if($response instanceof \Illuminate\Http\Response) {
		$output = $response->getOriginalContent();
		// remove whitespace between tags to avoid issues with inline-block
		$output = preg_replace('/>[\r\n\s]*</', '><', $output);
		$response->setContent($output);
	}
});

App::error(function(HttpException $exception) {
	// missing can't take filters like routes, so call needed stuff directly.
	extract(BaseController::prepareMake());
	$status_code = $exception->getStatusCode();
	$message = $exception->getMessage() ?: Lang::get('l-press::errors.httpStatus500');
	return Response::view($view_prefix . '.errors', array(
		'view_prefix' => $view_prefix,
		'title' => 'HttpError: ' + $status_code,
		'status_code' => $status_code,
		'message' => $message
	), $status_code);
});

App::error(function(\Illuminate\Session\TokenMismatchException $exception) {
	$status_code = 403;
	$message = Lang::get('l-press::errors.tokenMismatch');
	if(Request::ajax()) {
		$json = new \stdClass;
		$json->error = $message;
		return Response::json($json, $status_code);
	}
	return Response::view($view_prefix . '.errors', array(
		'view_prefix' => $view_prefix,
		'title' => 'HttpError: ' + $status_code,
		'status_code' => $status_code,
		'message' => $message
	), $status_code);
});

Route::filter(
	'theme',
	function() {
		ThemeController::verifyTheme();
	}
);

Route::filter(
	'general',
	function() {
		return checkSSL();
	}
);

Route::filter(
	'dashboard',
	function() {
		if(!Auth::check()) {
			if(Request::ajax()) {
				$json = new \stdClass;
				$json->error = Lang::get('l-press::errors.ajaxNotLoggedIn');
				$status_code = 403;
				return Response::json($json, $status_code);
			}
			Session::set('redirect', URL::full());
			return Redirect::route('lpress-login');
		}
		return checkSSL('dashboard');
	}
);

Route::filter(
	'login-ssl',
	function() {
		return checkSSL('login');
	}
);

Route::get(
	empty($route_prefix) ? '/' : $route_prefix,
	array(
		'before' => 'theme|general',
		'as' => 'lpress-index',
		function() {
			$route = Config::get('l-press::route_index');
			return App::make($route['controller'])->{$route['action']}();
		}
	)
);

Route::get(
	$route_prefix . '+sha2',
	array(
		'before' => 'theme',
		'as' => 'lpress-sha2',
		function() {
			extract(BaseController::prepareMake());
			return View::make($view_prefix . '.sha2', 
				array(
					'view_prefix' => $view_prefix,
					'title' => Lang::get('l-press::titles.sha2'),
					'route_prefix' => Config::get('l-press::route_prefix')
				)
			);
		}
	)
);

Route::get(
	$route_prefix . '+assets/{path}',
	array(
		'before' => 'theme',
		'uses' => 'EternalSword\LPress\AssetController@getAsset',
		'as' => 'lpress-asset'
	)
)->where('path', '(.*)');

Route::get(
	$route_prefix . '+login',
	array(
		'before' => 'theme|login-ssl',
		'uses' => 'EternalSword\LPress\AuthenticationController@getLogin',
		'as' => 'lpress-login'
	)
);

Route::get(
	$route_prefix . '+logout',
	array(
		'before' => 'theme|login-ssl',
		'uses' => 'EternalSword\LPress\AuthenticationController@getLogout',
		'as' => 'lpress-logout'
	)
);

Route::get(
	$route_prefix . '+logout/logged',
	array(
		'before' => 'theme|login-ssl',
		'as' => 'lpress-logout-logged',
		'uses' => 'EternalSword\LPress\AuthenticationController@getLogoutLogged'
	)
);

Route::get(
	$route_prefix . '+logout/login',
	array(
		'as' => 'lpress-logout-login',
		function() {
			Auth::logout();
			return Redirect::route('lpress-login');
		}
	)
);

Route::post(
	$route_prefix . '+login',
	array(
		'before' => 'csrf|theme',
		'uses' => 'EternalSword\LPress\AuthenticationController@verifyLogin'
	)
);


Route::group(
	array(
		'prefix' => $route_prefix . $dashboard_route
	),
	function() {
		$group = 'lpress-dashboard';
		Route::get(
			'/',
			array(
				'before' => 'theme|dashboard',
				'as' => $group,
				'uses' => 'EternalSword\LPress\DashboardController@getDashboard'
			)
		);
		Route::get(
			'install',
			array(
				'before' => 'theme|dashboard',
				'as' => $group . '.installer',
				'uses' => 'EternalSword\LPress\InstallController@getInstaller'
			)
		);
		Route::group(
			array(
				'prefix' => 'upload'
			),
			function() {
				$group = 'lpress-dashboard';
				Route::get(
					'/',
					array(
						'before' => 'csrf|theme|dashboard',
						'uses' => 'EternalSword\LPress\UploadController@getURL'
					)
				);
				Route::post(
					'/',
					array(
						'before' => 'csrf|theme|dashboard',
						'uses' => 'EternalSword\LPress\UploadController@postFile'
					)
				);
				Route::delete(
					'/',
					array(
						'before' => 'csrf|theme|dashboard',
						'uses' => 'EternalSword\LPress\UploadController@deleteFile'
					)
				);
			}
		);
		Route::group(
			array(
				'prefix' => 'records',
			),
			function() {
				$group = 'lpress-dashboard';
				Route::get(
					'create',
					array(
						'as' => $group . '.records.create',
						'uses' => 'EternalSword\LPress\RecordController@getRecordForm',
						'before' => 'theme|dashboard'
					)
				);
				Route::post(
					'create',
					array(
						'as' => $group . 'records.create',
						'uses' => 'EternalSword\LPress\RecordController@createRecord',
						'before' => 'theme|dashboard'
					)
				);
			}
		);
		Route::get(
			'{slug}',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeGetAction'
			)
		);
		Route::get(
			'{slug}/{id}',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeGetAction'
			)
		);
		Route::post(
			'{slug}/{id}',
			array(
				'before' => 'csrf|theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routePostAction'
			)
		);
		Route::get(
			'{slug}/{id}/restore',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeRestoreAction'
			)
		);
		Route::get(
			'{slug}/{id}/delete',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeDeleteAction'
			)
		);
		Route::get(
			'{slug}/{id}/{pivot}',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeGetPivotAction'
			)
		);
		Route::post(
			'{slug}/{id}/{pivot}',
			array(
				'before' => 'csrf|theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routePostPivotAction'
			)
		);
		Route::get(
			'{slug}/{id}/{pivot}/add',
			array(
				'before' => 'theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeGetPivotAdd'
			)
		);
		Route::post(
			'{slug}/{id}/{pivot}/add',
			array(
				'before' => 'csrf|theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routePostPivotAdd'
			)
		);
		Route::delete(
			'{slug}/{id}',
			array(
				'before' => 'csrf|theme|dashboard',
				'uses' => 'EternalSword\LPress\DashboardController@routeDeleteAction'
			)
		);
	}
);
Route::get(
	'{path}',
	array(
		'before' => 'theme|general',
		'uses' => 'EternalSword\LPress\RecordController@parseRoute'
	)
)->where('path', '[A-z0-9\-\/\.]+');
Route::get(
	'{all}',
	array(
		'before' => 'theme|general',
		function($all) { App::abort(404, Lang::get('l-press::errors.invalidRoute')); }
	)
)->where('all', '.*');
