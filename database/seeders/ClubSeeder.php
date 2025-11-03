<?php

namespace Database\Seeders;
use Faker\Factory;
use App\Models\Club;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        $users = User::all()->pluck('id')->toArray();
        for ($i = 0; $i < 30; $i++) {
            Club::create([
                'name' => $faker->name(),
                'city' => $faker->city(),
                'matches_played' => $faker->numberBetween(0, 100),
                'matches_won' => $faker->numberBetween(0, 100),
                'matches_lost' => $faker->numberBetween(0, 100),
                'matches_drawn' => $faker->numberBetween(0, 100),
                'user_id' => $faker->randomElement($users),
            ]);
        }
    }
}
