<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Club;
use App\Models\User;

class ClubTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function index_displays_club_names()
    {
        // create a user and a club
        $user = User::factory()->create();
        $club = Club::factory()->create([
            'user_id' => $user->id,
            'name' => 'Test Club Name'
        ]);

        // visit home (index) which lists clubs
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('Test Club Name');
    }

    /** @test */
    public function show_route_returns_view_and_displays_club()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create([
            'user_id' => $user->id,
            'name' => 'Show Club Example'
        ]);

        $response = $this->get('/clubs/' . $club->id);

        $response->assertStatus(200);
        $response->assertViewIs('clubs.show');
        $response->assertSee('Show Club Example');
    }
}
