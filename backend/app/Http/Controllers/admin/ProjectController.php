<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    //this function will return all projects
    public function index()
    {
        $project = Project::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Here are all projects'
        ]);
    }
    //this function will insert all projects
    public function store(Request $request)
    {

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project = Project::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'short_desc' => $request->short_desc,
            'content' => $request->content,
            'construction_type' => $request->construction_type,
            'sector' => $request->sector,
            'status' => $request->status,
            'location' => $request->location,


        ]);

        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $project->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/projects/small/' . $fileName);
                $image->coverDown(500, 600);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/projects/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPathLarge);
                $project->update([
                    'imageid' => $fileName,
                ]);
                // if ($oldImage != '') {
                //     File::delete(public_path('uploads/services/large/' . $oldImage));
                //     File::delete(public_path('uploads/services/small/' . $oldImage));
                // }
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Project added Successfully',
            'data' => $project
        ]);
    }

    public function update($id, Request $request)
    {

        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'

            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id . ',id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'short_desc' => $request->short_desc,
            'content' => $request->content,
            'construction_type' => $request->construction_type,
            'sector' => $request->sector,
            'status' => $request->status,
            'location' => $request->location,


        ]);

        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);
            $oldImage = $project->imageid;

            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $project->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/projects/small/' . $fileName);
                $image->coverDown(500, 600);
                $image->save($destPathSmall);

                //Create a Large Thumbnail here or Large dimension image
                $destPathLarge = public_path('uploads/projects/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPathLarge);
                $project->update([
                    'imageid' => $fileName,
                ]);
                if ($oldImage != '') {
                    File::delete(public_path('uploads/projects/large/' . $oldImage));
                    File::delete(public_path('uploads/projects/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Project updated Successfully',
            'data' => $project
        ]);
    }

    public function show($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'project not found',

            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'single project',
            'data' => $project
        ]);
    }
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'project not found',

            ]);
        }
        $oldImage = $project->imageid;
      
        
        File::delete(public_path('uploads/projects/large/' . $oldImage));
        File::delete(public_path('uploads/projects/small/' . $oldImage));
        $project->delete();
        return response()->json([
            'status' => true,
            'message' => 'project deleted successfully',

        ]);
    }
}
