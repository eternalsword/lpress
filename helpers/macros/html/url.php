<?php namespace EternalSword\Lib;

use Collective\Html\HtmlBuilder as HTML;

HTML::macro('url', function($url, $text = null, $attributes = array()) {
	$attribute_string = '';
	$has_title = false;
	if(is_array($attributes) && count($attributes) > 0) {
		foreach($attributes as $attribute => $value) {
			if($attribute == 'title') {
				$title = $value;
				$has_title = true;
			}
			else {
				$attribute_string .= " ${attribute}='${value}'";
			}
		}
	}
	$text = is_null($text) ? $url : $text;
	$title = $has_title ? $title : $text;
	return "<a href='${url}' title='${title}'${attribute_string}>${title}</a>";
});
