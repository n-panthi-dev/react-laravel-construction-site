<?php

use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImgController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\ContractController;
use App\Http\Controllers\front\MemberController as FrontMemberController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/auth', [AuthenticationController::class, 'authenticate']);



Route::group(['middleware' => ['auth:sanctum']], function () {
    //protected Routes

    Route::get('/dashboard', [DashboardController::class, 'dashboard']);
    Route::get('/logout', [AuthenticationController::class, 'logout']);

    //service routes
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);

    //porject routes
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    //artical routes

    Route::post('/articles', [ArticleController::class, 'store']);
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{id}', [ArticleController::class, 'show']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

    //testimonial route

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);


    //member routes
    Route::post('/member', [MemberController::class, 'store']);
    Route::get('/member', [MemberController::class, 'index']);
    Route::get('/member/{id}', [MemberController::class, 'show']);
    Route::put('/member/{id}', [MemberController::class, 'update']);
    Route::delete('/member/{id}', [MemberController::class, 'destroy']);



    //temp image routes
    Route::post('/temp-images', [TempImgController::class, 'store']);
});
Route::get('/get-services', [FrontServiceController::class, 'index']);
Route::get('/get-latest-services', [FrontServiceController::class, 'latestServices']);
Route::get('/get-single-service/{id}', [FrontServiceController::class, 'show']);



Route::get('/get-projects', [FrontProjectController::class, 'allProjects']);
Route::get('/get-latest-projects', [FrontProjectController::class, 'latestProjects']);
Route::get('/get-single-project/{id}', [FrontProjectController::class, 'show']);


Route::get('/get-articles', [FrontArticleController::class, 'allArticles']);
Route::get('/get-latest-articles', [FrontArticleController::class, 'latestArticle']);
Route::get('/get-single-articles/{id}', [FrontArticleController::class, 'show']);

Route::get('/get-testimonials', [TestimonialsController::class, 'index']);
Route::get('/get-member', [FrontMemberController::class, 'index']);
Route::post('/contact-now', [ContractController::class, 'index']);
