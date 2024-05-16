<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;


Route::get('/', function () {
    return view('welcome');
});

// Rutas de API
Route::group(['prefix' => 'api'], function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/product', [ProductController::class, 'store']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::put('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::get('/csrf-token', [ProductController::class, 'token']);
});

/*Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrfToken' => csrf_token()]);
});*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// Ruta para obtener el token CSRF
/*
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrfToken' => csrf_token()]);
});*/







