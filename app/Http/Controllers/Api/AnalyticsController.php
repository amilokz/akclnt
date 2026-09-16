<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $days = (int) $request->query('days', 30);
        $days = in_array($days, [7, 30, 90]) ? $days : 30;
        $since = now()->subDays($days)->startOfDay();

        // Daily series (fill gaps with zero)
        $rows = DB::table('page_views')
            ->selectRaw('DATE(created_at) as d, COUNT(*) as views, COUNT(DISTINCT visitor_hash) as visitors')
            ->where('created_at', '>=', $since)
            ->groupBy('d')
            ->orderBy('d')
            ->get()
            ->keyBy('d');

        $series = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $series[] = [
                'date'     => $date,
                'views'    => (int) ($rows[$date]->views ?? 0),
                'visitors' => (int) ($rows[$date]->visitors ?? 0),
            ];
        }

        $base = DB::table('page_views')->where('created_at', '>=', $since);

        return response()->json([
            'range_days'     => $days,
            'total_views'    => (clone $base)->count(),
            'total_visitors' => (clone $base)->distinct('visitor_hash')->count('visitor_hash'),
            'today_views'    => DB::table('page_views')->whereDate('created_at', today())->count(),
            'today_visitors' => DB::table('page_views')->whereDate('created_at', today())->distinct('visitor_hash')->count('visitor_hash'),
            'series'         => $series,
            'top_pages'      => (clone $base)->selectRaw('path, COUNT(*) as views')
                                    ->groupBy('path')->orderByDesc('views')->limit(8)->get(),
            'referrers'      => (clone $base)->selectRaw('referrer, COUNT(*) as views')
                                    ->whereNotNull('referrer')
                                    ->groupBy('referrer')->orderByDesc('views')->limit(6)->get(),
            'devices'        => (clone $base)->selectRaw('device, COUNT(*) as views')
                                    ->groupBy('device')->orderByDesc('views')->get(),
            'countries'      => (clone $base)->selectRaw('country, COUNT(*) as views')
                                    ->whereNotNull('country')
                                    ->groupBy('country')->orderByDesc('views')->limit(6)->get(),
        ]);
    }
}