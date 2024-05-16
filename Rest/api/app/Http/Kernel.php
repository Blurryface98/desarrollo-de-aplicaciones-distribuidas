<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Otros middlewares
        \App\Http\Middleware\CorsMiddleware::class,
    ];

    protected $middlewareGroups = [
        /*'web' => [
            // Otros middlewares...
            \App\Http\Middleware\VerifyCsrfToken::class,
        ],
    
        'api' => [
            // Otros middlewares...
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],*/
    ];
    
}