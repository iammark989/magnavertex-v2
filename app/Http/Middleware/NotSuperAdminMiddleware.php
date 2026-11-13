<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NotSuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role?->slug === 'super-admin') {
            abort(403, 'Super Admin accounts cannot access this section.');
        }

        return $next($request);
    }
}