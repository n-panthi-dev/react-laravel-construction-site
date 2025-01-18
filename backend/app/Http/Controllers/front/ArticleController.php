<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Artical;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function allArticles()
    {
        $article = Artical::orderBy('created_at', 'DESC')->where('status', 1)->get();
        return response()->json([
            'status' => true,
            'message' => 'all articals',
            'data' => $article

        ]);
    }
    public function latestArticle(Request $request)
    {
        $article = Artical::orderBy('created_at', 'DESC')->where('status', 1)->limit($request->limit)->get();
        return response()->json([
            'status' => true,
            'message' => 'all articals',
            'data' => $article

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
}
