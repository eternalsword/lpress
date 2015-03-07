<?php namespace App\EternalSword\Models;

class Theme extends BaseModel {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'themes';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array();

	protected $fillable = array(
		'label',
		'description'
	);

	protected $rules = array(
		'label' => 'required',
		'slug' => 'required'
	);

	public function sites() {
		$this->hasMany('App\EternalSword\Models\Site');
	}
}