<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Club;
use App\Models\User;

class ClubFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Club::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company(),
            'city' => $this->faker->city(),
            'matches_played' => $this->faker->numberBetween(0, 100),
            'matches_won' => $this->faker->numberBetween(0, 100),
            'matches_lost' => $this->faker->numberBetween(0, 100),
            'matches_drawn' => $this->faker->numberBetween(0, 100),
            'user_id' => User::factory(),
        ];
    }
}
