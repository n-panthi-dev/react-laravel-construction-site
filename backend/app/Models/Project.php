<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_desc',
        'content',
        'construction_type',
        'sector',
        'status',
        'location',
        'imageid',
    ];

    use HasFactory;
}
