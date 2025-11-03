<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Club;
use App\Models\Joueur;
use Illuminate\Database\Seeder;

class JoueurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        $clubs = Club::all()->pluck('id')->toArray();
        for ($i = 0; $i < 900; $i++) {
            Joueur::create([
                'position' => $faker->randomElement(['Goalkeeper', 'Defender', 'Midfielder', 'Forward']),
                'name' => $faker->name(),
                'clubs_id' => $faker->randomElement($clubs),
                'matches_played' => $faker->numberBetween(0, 100),
                'country' => $faker->country(),
            ]);
        }
    }
}
