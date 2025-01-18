<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImg;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TestimonialController extends Controller
{
    //this method will return all the testimonials
    public function index()
    {

        $testimonials = Testimonial::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All Testimonials',
            'data' => $testimonials,
        ]);
    }
    //this method will single testimonial

    public function show($id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => ' Testimonials not found',
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => ' Single testimonial',
            'data' => $testimonial
        ]);
    }

    //this method will store single testomonial
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required'


        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'data' => $validator->errors()
            ]);
        }
        $testimonials = Testimonial::create([
            'testimonial' => $request->testimonial,
            'citation' => $request->citation,
            'status' => $request->status,
            'designation' => $request->designation,
        ]);

        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $testimonials->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/testimonials/' . $fileName);
                $image->coverDown(300, 300);
                $image->save($destPathSmall);


                $testimonials->update([
                    'image' => $fileName,
                ]);
                // if ($oldImage != '') {
                //     File::delete(public_path('uploads/services/large/' . $oldImage));
                //     File::delete(public_path('uploads/services/small/' . $oldImage));
                // }
            }
        }


        if ($testimonials) {
            return response()->json([
                'status' => true,
                'message' => 'Testimonial added successfully',
                'data' => $testimonials
            ]);
        }
    }
    public function update($id, Request $request)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => ' Testimonials not found',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required'


        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'data' => $validator->errors()
            ]);
        }
        $testimonial->update([
            'testimonial' => $request->testimonial,
            'citation' => $request->citation,
            'status' => $request->status,
            'designation' => $request->designation,
        ]);

        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);
            $oldImage = $testimonial->image;

            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/testimonials/' . $fileName);
                $image->coverDown(300, 300);
                $image->save($destPathSmall);

                $testimonial->update([
                    'image' => $fileName,
                ]);
                if ($oldImage != '') {
                    File::delete(public_path('uploads/testimonials/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => true,
            'message' => "Testimonial updated successfully",
            'data' => $testimonial
        ]);
    }
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => ' Testimonials not found',
            ]);
        }
        $oldImage = $testimonial->image;
        File::delete(public_path('uploads/testimonials/' . $oldImage));
        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial deleted successfully',

        ]);
    }
}
