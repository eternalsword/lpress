<?php

class LPressSitesTableSeeder extends Seeder {

    public function run()
    {
        $sites = array(
			array(
				'theme_id' => 1,
				'title' => 'My Awesome Site',
				'domain' => 'wildcard'
			)
        );

        // Uncomment the below to run the seeder
		DB::table('lpress_sites')->insert($sites);
    }

}