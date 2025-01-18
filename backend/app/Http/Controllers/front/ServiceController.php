<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    { {
            $services = Service::where('status', 1)->orderBy('created_at', 'DESC')->get();
            return response()->json([
                'status' => true,
                'message' => 'All active services',
                'data' => $services,
            ]);
        }
    }
    public function latestServices(Request $request)
    {
        $services = Service::where('status', 1)->limit($request->get('limit'))->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'Latest services',
            'data' => $services,
        ]);
    }
    public function show($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Single service data',
            'data' => $service,
        ], 200);
    }
}
