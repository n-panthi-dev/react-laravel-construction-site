<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function Pest\Laravel\json;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {


        //validation
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required|min:6",
        ]);

        //showing validation errors
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation failed',
                'error' => $validator->errors()
            ], 400);
        }

        //authenticating error
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password,])) {
            $authUser = Auth::user();
            return response()->json([
                'success' => true,
                'id'=> $authUser->id,
                'message' => 'Logged in successfully',
                'token' => $authUser->createToken('API Token')->plainTextToken,
                'token_type' => 'bearer',
            ], 200);
        }
        //if user is not authenticated
        else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Email or Password',
                
            ], 400);
        }
    }

    public function logout(Request $request)
    {

        $result = $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logged Out successful',
            'data' => $result
          
        ], 200);
    }
}
