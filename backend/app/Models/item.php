<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
     use HasFactory;

    protected $fillable = [
        'name', // Allow mass assignment for the name array
        'title',
    ];
    protected $casts = [
        'name' => 'array', // Cast the name attribute to an array
    ];
}
