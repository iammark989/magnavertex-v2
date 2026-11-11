<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (
            !$user ||
            !$user->is_active ||
            !$user->role ||
            $user->role->slug !== 'super-admin'
        ) {
            abort(403, 'Only Super Admin can access this resource.');
        }

        return $next($request);
    }
}