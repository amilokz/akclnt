<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProOrder;
use Illuminate\Http\Request;
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

    // Admin: approve / reject
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
        if ($data['status'] === 'approved' && ! $order->approved_at) {
            $order->approved_at = now();
            // Part 4: yahan n8n Pro workflow trigger hoga
        }
        $order->save();

        return response()->json(['ok' => true, 'order' => $order]);
    }
}
