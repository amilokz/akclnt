<?php

namespace App\Http\Controllers;

use App\Models\AuditRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebsiteAuditController extends Controller
{
    private const EMAIL_LIMIT = 3;
    private const IP_LIMIT = 10;
    private const WINDOW_DAYS = 30;

    public function store(Request $request)
    {
        $data = $request->validate([
            'url'   => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'name'  => 'nullable|string|max:100',
        ]);

        $email = strtolower(trim($data['email']));
        $ip    = $request->header('CF-Connecting-IP') ?: $request->ip();
        $since = now()->subDays(self::WINDOW_DAYS);

        $emailCount = AuditRequest::where('email', $email)->where('created_at', '>=', $since)->count();
        $ipCount    = AuditRequest::where('ip', $ip)->where('created_at', '>=', $since)->count();

        if ($emailCount >= self::EMAIL_LIMIT || $ipCount >= self::IP_LIMIT) {
            return response()->json([
                'ok'      => false,
                'limit'   => true,
                'message' => 'You have used your 3 free audits for this month. Get a Pro Audit or talk to our team for a detailed review.',
            ], 429);
        }

        try {
            $res = Http::timeout(20)->post(
                config('services.n8n.audit_webhook', 'http://localhost:5678/webhook/website-audit'),
                ['url' => $data['url'], 'email' => $email, 'name' => $data['name'] ?? '']
            );
        } catch (\Throwable $e) {
            Log::error('Audit webhook failed: ' . $e->getMessage());
            return response()->json(['ok' => false, 'message' => 'The audit could not start. Please try again in a minute.'], 502);
        }

        if (! $res->successful()) {
            return response()->json(['ok' => false, 'message' => 'The audit could not start. Check the website address and try again.'], 422);
        }

        AuditRequest::create([
            'email' => $email,
            'url'   => $data['url'],
            'name'  => $data['name'] ?? null,
            'ip'    => $ip,
        ]);

        $left = self::EMAIL_LIMIT - $emailCount - 1;

        return response()->json([
            'ok'        => true,
            'remaining' => $left,
            'message'   => "Audit started. Your report will reach your inbox in 1-2 minutes. Free audits left this month: {$left}.",
        ]);
    }
}
