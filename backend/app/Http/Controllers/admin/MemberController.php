<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => "All members data",
            'data' => $members,
        ]);
    }
    public function show($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'member not found',

            ]);
        }


        return response()->json([
            'status' => true,
            'message' => 'Single member',
            'data' => $member,
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation Error",
                'data' => $validator->errors(),
            ]);
        }
        $member = Member::create([
            'name' => $request->name,
            'job_title' => $request->job_title,
            'linkedin_url' => $request->linkedin_url,
            'status' => $request->status,
        ]);


        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);


            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/members/' . $fileName);
                $image->coverDown(400, 500);
                $image->save($destPathSmall);


                $member->update([
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
            'message' => 'Member added successfully',
            'data' => $member

        ]);
    }
    public function update($id, Request $request)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'member not found',

            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation Error",
                'data' => $validator->errors(),
            ]);
        }
        $member->update([
            'name' => $request->name,
            'job_title' => $request->job_title,
            'linkedin_url' => $request->linkedin_url,
            'status' => $request->status,
        ]);


        //Save temp image here

        if ($request->imageId > 0) {
            $tempImage = TempImg::find($request->imageId);
            $oldImage = $member->image;

            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;


                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);

                //Create a Small Thumbnail here or small dimension image
                $destPathSmall = public_path('uploads/members/' . $fileName);
                $image->coverDown(400, 500);
                $image->save($destPathSmall);


                $member->update([
                    'image' => $fileName,
                ]);
                if ($oldImage != '') {
                    File::delete(public_path('uploads/members/' . $oldImage));
                }
            }
        }


        return response()->json([
            'status' => true,
            'message' => 'Member updated successfully',
            'data' => $member

        ]);
    }
    public function destroy($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'member not found',

            ]);
        }
        $oldImage = $member->image;
        File::delete(public_path('uploads/members/' . $oldImage));
        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'member deleted successfully',

        ]);
        
    }
}
