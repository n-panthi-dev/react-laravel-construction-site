<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

use function Pest\Laravel\json;

class TestimonialsController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')->where('status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'All testimonials',
            'data' => $testimonials
        ]);
    }
}
