<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImgController extends Controller
{
    public function store(Request $request)
    {

        // validation
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpg,png,jpeg,gif'
        ]);

        //showing validation error
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'Message' => 'Validation Error',
                'errors' => $validator->errors('image')
            ], 404);
        }
        // getting uploaded image extension
        $ext = $request->image->getClientOriginalExtension();
        //naming image by current time with uploaded extension
        $imageName = strtotime('now') . '.' . $ext;
        //storing image name in database
        $img = TempImg::create([
            'name' => $imageName,
        ]);
        //storing image in public/uploads/temp folder
        $request->image->move(public_path('uploads/temp'), $imageName);

        //Create a Small Thumbnail here or small dimension image
        $sourcePath = public_path('uploads/temp/' . $imageName);
        $destPath = public_path('uploads/temp/thumbnail/' . $imageName);


        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);



        //showing success message 
        if ($image) {
            return response()->json([
                'status' => true,
                'message' => 'Image uploaded sucessfully',
                'data' => $img
            ]);
        }
    }
}
