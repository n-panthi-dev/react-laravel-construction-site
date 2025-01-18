<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImg;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'DESC')->get();
        if ($services) {
            return response()->json([
                'status' => true,
                'message' => "All Services ",
                'data' => $services
            ]);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Validation Error',
                    'errors' => $validator->errors()
                ],
                422

            );
        }
        $data = Service::create([
            'title' => $request->title,
            'short_desc' => $request->short_desc,
            'slug' => Str::slug($request->slug),
            'content' => $request->content,
            'status' => $request->status,
        ]);


        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $data->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);


                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/services/small/' . $fileName);
                $image->coverDown(500, 600);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/services/large/' . $fileName);
                $image = $manager->read($sourcePath);

                $image->scaleDown(1200, 1200);
                $image->save($destPathLarge);
                $data->update(['image' => $fileName]);
            }
        }
        return response()->json([
            'status' => true,
            'message' => "Service added successfully",
            'data' => $data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
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



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug,' . $id . ',id',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Validation Error',
                    'errors' => $validator->errors()
                ],
                422

            );
        }
        $service->update([
            'title' => $request->title,
            'short_desc' => $request->short_desc,
            'slug' => Str::slug($request->slug),
            'content' => $request->content,

            'status' => $request->status,
        ]);

        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);
            $oldImage = $service->image;


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $service->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/services/small/' . $fileName);
                $image->coverDown(500, 600);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/services/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPathLarge);
                $service->update([
                    'image' => $fileName,
                ]);
                if ($oldImage != '') {
                    File::delete(public_path('uploads/services/large/' . $oldImage));
                    File::delete(public_path('uploads/services/small/' . $oldImage));
                }
            }
        }





        return response()->json([
            'status' => true,
            'message' => "Service updated successfully",
            'data' => $service
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }
        $oldImage = $service->imageid;


        File::delete(public_path('uploads/services/large/' . $oldImage));
        File::delete(public_path('uploads/services/small/' . $oldImage));
        $service->delete();
        return response()->json([
            'status' => true,
            'message' => 'service deleted successfully',

        ], 200);
    }
}
