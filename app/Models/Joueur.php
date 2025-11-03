<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    use HasFactory;

    protected $fillable = ['position', 'name', 'matches_played', 'country', 'clubs_id', 'image'];

    public function club()
    {
        return $this->belongsTo(Club::class, 'clubs_id');
    }
}
