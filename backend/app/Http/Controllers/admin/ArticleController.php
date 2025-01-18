<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Artical;
use App\Models\TempImg;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    //this method will fetch all article
    public function index()
    {
        $articals = Artical::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All articals',
            'data' => $articals


        ]);
    }

    //this method will insert article
    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articals,slug'

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation unsuccessfull",
                'errors' => $validator->errors()
            ]);
        }
        $artical = Artical::create([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'author' => $request->author,
            'content' => $request->content,
            'status' => $request->status,

        ]);


        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $artical->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/articals/small/' . $fileName);
                $image->coverDown(450, 300);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/articals/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPathLarge);
                $artical->update([
                    'image' => $fileName,
                ]);
                // if ($oldImage != '') {
                //     File::delete(public_path('uploads/services/large/' . $oldImage));
                //     File::delete(public_path('uploads/services/small/' . $oldImage));
                // }
            }
        }
        return response()->json([
            'status' => true,
            'message' => "Artical added successfully",
            'data' => $artical
        ]);
    }
    public function show($id)
    {
        $artical = Artical::find($id);
        if (!$artical) {
            return response()->json([
                'status' => false,
                'message' => 'project not found',

            ]);
        }


        return response()->json([
            'status' => true,
            'message' => 'Single artical',
            'data' => $artical,
        ]);
    }

    public function update($id, Request $request)
    {

        $artical = Artical::find($id);
        if (!$artical) {
            return response()->json([
                'status' => false,
                'message' => 'artical is not available',
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id . ',id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation unsuccessfull",
                'errors' => $validator->errors()
            ]);
        }
        $artical->update([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'author' => $request->author,
            'content' => $request->content,
            'status' => $request->status,

        ]);


        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);
            $oldImage = $artical->image;

            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $artical->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/articals/small/' . $fileName);
                $image->coverDown(450, 300);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/articals/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPathLarge);
                $artical->update([
                    'image' => $fileName,
                ]);
                if ($oldImage != '') {
                    File::delete(public_path('uploads/articals/large/' . $oldImage));
                    File::delete(public_path('uploads/articals/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => true,
            'message' => "Artical updated successfully",
            'data' => $artical
        ]);
    }
    public function destroy($id) {
        $artical = Artical::find($id);
        if (!$artical) {
            return response()->json([
                'status' => false,
                'message' => 'artical is not available',
            ]);
        }


        $oldImage = $artical->image;
        File::delete(public_path('uploads/articals/large/' . $oldImage));
        File::delete(public_path('uploads/articals/small/' . $oldImage));
        $artical->delete();

        return response()->json([
            'status' => true,
            'message' => 'artical deleted successfully',

        ]);
        
    }
}
