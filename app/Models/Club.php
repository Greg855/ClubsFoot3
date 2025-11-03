<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;
    protected $fillable = ['name','city','matches_played','matches_won','matches_lost','matches_drawn','user_id','image'];


    public function joueurs()
{
    return $this->hasMany(Joueur::class, 'clubs_id');
}

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
