<?php
	return array(
		'uploads' => array('path_base' => 'package', 'path' => 'uploads'),
		'themes' => array('path_base' => 'package', 'path' => 'views/themes'),
		'route_index' => array(
			'controller' => 'EternalSword\LPress\IndexController',
			'action' => 'getIndex'
		)
	);