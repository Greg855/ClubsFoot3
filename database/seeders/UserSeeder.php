<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $user = new User;
            $user->name = $faker->name;
            $user->email = $faker->unique()->email;
            $user->password = bcrypt('password');
            $user->save();
        }
    }
}
