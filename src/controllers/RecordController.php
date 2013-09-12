<?php namespace EternalSword\LPress;

use Illuminate\Routing\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\HTML;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\View;

class RecordController extends BaseController {
	public static function parseRoute($path) {
		$route = BaseController::slugsToRoute($path);
		$route->path = $path;
		if($route->throw404) {
			App::abort(404, 'Could not locate object from path.');
		}
		if($route->slug_types[0] == 'record') {
			return self::getRecord($route);
		}
		if($route->slug_types[0] == 'record_type') {
			return self::getRecordsByRecordType($route);
		}
	}

	public static function getRecord($route) {
		$json = $route->json;
		$record = $route->record;
		$record->load(
			'author',
			'publisher',
			'values.field',
			'values.current_revision.author',
			'values.current_revision.publisher'
		);
		if($json) {
			return Response::json($record);
		}
		if($route->root_record_type->slug == 'attachments') {
			$path = dirname($route->path);
			$download = $route->download;
			if($download) {
				$path = dirname($path);
			}
			$path = 'attachments/' . $path;
			$path .= '/' . $record->values[0]->current_revision->contents;
			if($download) {
				$path .= '/download';
			}
			$asset = new AssetController;
			$asset->getAsset($path);
		}
	}

	public static function getRecordsByRecordType($route) {
		$json = $route->json;
		$record_type = $route->record_type;
		$record_type->load('records');
		if(count($record_type->records) > 0) {
			$record_type->records->load(
				'author',
				'publisher',
				'values.field',
				'values.current_revision.author',
				'values.current_revision.publisher'
			);
		}
		if($json) {
			return Response::json($record_type);
		}
		$slugs = $route->slugs;
		extract(parent::prepareMake());
		$label = $record_type->label_plural;
		$original_record_type = $record_type;
		while($record_type->depth > 0) {
			try {
				return View::make($view_prefix . '.collections.' . $record_type->slug, 
					array(
						'domain' => DOMAIN,
						'view_prefix' => $view_prefix,
						'title' => $site[0]['label'] . '::' . $label,
						'label' => $label,
						'slugs' => $slugs,
						'path' => $route->path,
						'record_type' => $original_record_type,
						'route_prefix' => Config::get('l-press::route_prefix')
					)
				);
			} catch (\InvalidArgumentException $e) {
				$record_type->load('parent_type');
				$record_type = $record_type->parent_type;
			}
		}
		return App::abort(404, 'Could not locate object from path.');
	}
}
