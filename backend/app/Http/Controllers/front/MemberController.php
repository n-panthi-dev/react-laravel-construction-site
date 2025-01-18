<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        $member = Member::orderBy('created_at', 'DESC')->where('status', 1)->get();

        return response()->json([
            'status' => true,
            'message' => 'all member data',
            'data' => $member,
        ]);
    }
}
