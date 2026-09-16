<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrackPageView
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        try {
            $path = '/' . ltrim($request->path(), '/');

            // Skip assets, api, admin, and bots
            $skip = ['/api', '/admin', '/client', '/build', '/storage', '/favicon', '/sitemap'];
            foreach ($skip as $prefix) {
                if (str_starts_with($path, $prefix)) return $response;
            }

            $ua = (string) $request->userAgent();
            if (preg_match('/bot|crawler|spider|crawling|facebookexternalhit|slurp/i', $ua)) {
                return $response;
            }

            $device = 'desktop';
            if (preg_match('/mobile|android|iphone/i', $ua)) $device = 'mobile';
            elseif (preg_match('/ipad|tablet/i', $ua)) $device = 'tablet';

            DB::table('page_views')->insert([
                'path'         => mb_substr($path, 0, 255),
                'referrer'     => mb_substr((string) $request->headers->get('referer'), 0, 255) ?: null,
                // hash only — we never store the raw IP
                'visitor_hash' => hash('sha256', $request->ip() . $ua . config('app.key')),
                'device'       => $device,
                'country'      => $request->headers->get('CF-IPCountry'), // Cloudflare sets this
                'created_at'   => now(),
            ]);
        } catch (\Throwable $e) {
            // analytics must never break the site
        }

        return $response;
    }
}