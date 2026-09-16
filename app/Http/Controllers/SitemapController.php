<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = rtrim(config('app.url'), '/');
        $today = now()->toDateString();

        $pages = [
            ['loc' => '/',            'priority' => '1.0', 'freq' => 'weekly'],
            ['loc' => '/services',    'priority' => '0.9', 'freq' => 'weekly'],
            ['loc' => '/portfolio',   'priority' => '0.9', 'freq' => 'weekly'],
            ['loc' => '/about',       'priority' => '0.8', 'freq' => 'monthly'],
            ['loc' => '/team',        'priority' => '0.7', 'freq' => 'monthly'],
            ['loc' => '/contact',     'priority' => '0.8', 'freq' => 'monthly'],
            ['loc' => '/faq',         'priority' => '0.6', 'freq' => 'monthly'],
            ['loc' => '/testimonials','priority' => '0.6', 'freq' => 'monthly'],
            ['loc' => '/privacy',     'priority' => '0.3', 'freq' => 'yearly'],
            ['loc' => '/terms',       'priority' => '0.3', 'freq' => 'yearly'],
            ['loc' => '/blog', 'priority' => '0.8', 'freq' => 'weekly'],
            ['loc' => '/products',    'priority' => '0.8', 'freq' => 'weekly'],
        ];

        $xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($pages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$base}{$page['loc']}</loc>\n";
            $xml .= "    <lastmod>{$today}</lastmod>\n";
            $xml .= "    <changefreq>{$page['freq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        

        // Individual service pages
        foreach (Service::where('is_active', true)->get() as $service) {
            $lastmod = optional($service->updated_at)->toDateString() ?? $today;
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$base}/services/{$service->id}</loc>\n";
            $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

                foreach (\App\Models\Post::published()->get() as $post) {
            $xml .= "  <url>\n    <loc>{$base}/blog/{$post->slug}</loc>\n";
            $xml .= "    <lastmod>" . $post->updated_at->toDateString() . "</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}