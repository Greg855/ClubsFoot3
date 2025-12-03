<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\JoueurController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LocalizationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ClubController::class,'index']);

Route::resources([
                'clubs' => ClubController::class,
                'joueurs' => JoueurController::class,
                ]);

Route::post('/autocomplete', [ClubController::class,'autocomplete'])->name('autocomplete');
Route::get('/search', [ClubController::class, 'search'])->name('search');

Route::get('/apropos', function () {
    return view('apropos');
});

Auth::routes();
Auth::routes(['verify' => true]);

Route::get('lang/{locale}', [LocalizationController::class, 'index']);

Route::get('{any}', function () {
    return view('monopage');
})->where('any', '.*');

Route::get('/email/verify', function () {
    return view('auth.verify');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::prefix('/admin/clubs')->middleware(['admin'])->group(function () {
    Route::get('/', [ClubController::class, 'index'])->name('clubs.index');
    Route::get('/create', [ClubController::class, 'create'])->name('clubs.create');
    Route::post('/store', [ClubController::class, 'store'])->name('clubs.store');
    Route::get('/{id}', [ClubController::class, 'show'])->name('clubs.show');
    Route::get('/{id}/edit', [ClubController::class, 'edit'])->name('clubs.edit');
    Route::patch('/{id}/update', [ClubController::class, 'update'])->name('clubs.update');
    Route::delete('/{id}', [ClubController::class, 'destroy'])->name('clubs.destroy');
});

Route::get('/translations/{lang}', function ($lang) {
    return response()->json(require resource_path("lang/$lang/general.php"));
});
