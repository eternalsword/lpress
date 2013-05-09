<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLPressGroupsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('lpress_groups', function(Blueprint $table) {
            $table->increments('id');
			$table->string('label')->unique();
			$table->text('description');
			$table->integer('site_id');
			$table->integer('record_type_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('lpress_groups');
    }

}
