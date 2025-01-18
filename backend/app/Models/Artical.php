<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artical extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'author',
        'slug',
        'content',
        'status',
        'image',
    ];
    protected function casts()
    {
        return ['created_at' => 'datetime:d M, Y'];
    }
}
