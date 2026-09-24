<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProOrder;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ProOrderController extends Controller
{
    // Public: prices + payment details for the Pro page
    public function packages()
    {
        return response()->json([
            'packages' => config('pro_audit.packages'),
            'payment'  => config('pro_audit.payment'),
        ]);
    }

    // Public: customer submits order with TID
    public function store(Request $request)
    {
        $needsWebsite = in_array($request->package, ['website', 'combo']);
        $needsApp     = in_array($request->package, ['app', 'combo']);

        $data = $request->validate([
            'package'     => ['required', Rule::in(array_keys(config('pro_audit.packages')))],
            'name'        => 'required|string|max:100',
            'email'       => 'required|email|max:255',
            'phone'       => 'nullable|string|max:30',
            'website_url' => ['nullable', 'string', 'max:255', Rule::requiredIf($needsWebsite)],
            'app_url'     => ['nullable', 'url', 'max:500', Rule::requiredIf($needsApp), 'regex:/(play\.google\.com|apps\.apple\.com)/i'],
            'tid'         => ['required', 'string', 'regex:/^[A-Za-z0-9]{6,30}$/', 'unique:pro_orders,tid'],
        ], [
            'tid.unique'    => 'This transaction ID has already been used. Contact us if you think this is a mistake.',
            'tid.regex'     => 'Enter the transaction ID exactly as shown in your JazzCash receipt.',
            'app_url.regex' => 'Paste the Google Play or App Store link of your app.',
        ]);

        $order = ProOrder::create([
            ...$data,
            'email'  => strtolower(trim($data['email'])),
            'amount' => config("pro_audit.packages.{$data['package']}.price"),
            'status' => 'pending',
            'ip'     => $request->header('CF-Connecting-IP') ?: $request->ip(),
        ]);

        return response()->json([
            'ok'       => true,
            'order_id' => $order->id,
            'message'  => 'Order received. We will verify your payment and email your Pro report within 24 hours.',
        ], 201);
    }

    // Admin: list orders (optional ?status=pending)
    public function adminIndex(Request $request)
    {
        $query = ProOrder::latest();
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        return response()->json($query->paginate(20));
    }

    // Admin: approve / reject. Approving starts the audit.
    public function updateStatus(Request $request, $id)
    {
        $data = $request->validate([
            'status'     => 'required|in:pending,approved,rejected',
            'admin_note' => 'nullable|string|max:500',
        ]);

        $order = ProOrder::findOrFail($id);
        $order->status = $data['status'];
        if (array_key_exists('admin_note', $data)) {
            $order->admin_note = $data['admin_note'];
        }

        $start = false;
        if ($data['status'] === 'approved' && ! $order->approved_at) {
            $order->approved_at = now();
            $start = true;
        }
        $order->save();

        $started = $start ? $this->startAudit($order) : null;

        return response()->json(['ok' => true, 'order' => $order, 'audit_started' => $started]);
    }

    // Admin: run the audit again (e.g. if n8n or email failed)
    public function retry($id)
    {
        $order = ProOrder::findOrFail($id);
        if ($order->status !== 'approved') {
            return response()->json(['ok' => false, 'message' => 'Only approved orders can be re-run.'], 422);
        }
        return response()->json(['ok' => $this->startAudit($order)]);
    }

    // n8n callback: receives the finished report, builds the PDF and emails it
    public function report(Request $request, $id)
    {
        $secret = (string) config('pro_audit.callback_secret');
        if ($secret === '' || ! hash_equals($secret, (string) $request->header('X-Audit-Secret'))) {
            abort(403);
        }

        $order  = ProOrder::findOrFail($id);
        $report = $request->validate(['report' => 'required|array'])['report'];

        $order->report = $report;
        $order->save();

        $pdf = Pdf::loadView('pdf.pro-audit', [
            'order'    => $order,
            'r'        => $report,
            'packages' => config('pro_audit.packages'),
        ])->setPaper('a4')->output();

        $sent = $this->emailReport($order, $pdf);
        if ($sent) {
            $order->report_sent_at = now();
            $order->save();
        }

        return response()->json(['ok' => $sent]);
    }

    private function startAudit(ProOrder $order): bool
    {
        try {
            $res = Http::timeout(15)->post(config('pro_audit.n8n_webhook'), [
                'order_id'     => $order->id,
                'package'      => $order->package,
                'name'         => $order->name,
                'email'        => $order->email,
                'website_url'  => $order->website_url,
                'app_url'      => $order->app_url,
                'callback_url' => rtrim(config('app.url'), '/') . "/api/pro-audit/orders/{$order->id}/report",
                'secret'       => config('pro_audit.callback_secret'),
            ]);
            if (! $res->successful()) {
                Log::error("Pro audit #{$order->id}: n8n returned " . $res->status());
            }
            return $res->successful();
        } catch (\Throwable $e) {
            Log::error("Pro audit #{$order->id}: n8n failed: " . $e->getMessage());
            return false;
        }
    }

    private function emailReport(ProOrder $order, string $pdf): bool
    {
        $name = e($order->name);
        $res = Http::withToken(config('pro_audit.resend_key'))
            ->timeout(30)
            ->post('https://api.resend.com/emails', [
                'from'     => config('pro_audit.mail_from'),
                'to'       => [$order->email],
                'bcc'      => [config('pro_audit.admin_email')],
                'reply_to' => config('pro_audit.admin_email'),
                'subject'  => "Your Pro Audit report is ready (Order #{$order->id})",
                'html'     => "<p>Hi {$name},</p><p>Thank you for your order. Your Pro Audit report is attached as a PDF.</p>"
                            . "<p>It includes your scores, the biggest issues and a step-by-step fix plan. "
                            . "Reply to this email if you want our team to fix any of it for you.</p><p>Team akclnt</p>",
                'attachments' => [[
                    'filename' => "akclnt-pro-audit-{$order->id}.pdf",
                    'content'  => base64_encode($pdf),
                ]],
            ]);

        if (! $res->successful()) {
            Log::error("Pro audit #{$order->id}: Resend failed: " . $res->body());
        }
        return $res->successful();
    }
}
