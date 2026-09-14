<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ClientWelcomeMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Lead;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ClientProfile;
use Illuminate\Support\Str;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service_id' => 'required|exists:services,id',
            'budget' => 'nullable|string|max:100',
            'message' => 'required|string',
        ]);

               $lead = Lead::create($validated);

        try {
            Mail::to(config('mail.admin_address'))->send(new \App\Mail\NewLeadMail($lead->load('service')));
        } catch (\Throwable $e) {
            report($e); // email fail ho to bhi lead save rahe
        }

        return response()->json([
            'message' => 'Inquiry submitted successfully',
            'lead' => $lead,
        ], 201);
    }

    public function index()
    {
        return Lead::with('service')->latest()->get();
    }

    public function updateStatus(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:new,contacted,meeting_scheduled,deal_done,converted,lost',
        ]);

        $lead->update($validated);

        return response()->json([
            'message' => 'Status updated',
            'lead' => $lead,
        ]);
    }

   public function convertToClient($id)
{
    $lead = Lead::findOrFail($id);

    if ($lead->status !== 'deal_done') {
        return response()->json([
            'message' => 'Lead must be in "deal_done" status before converting.',
        ], 422);
    }

    $existing = User::where('email', $lead->email)->first();
    if ($existing) {
        return response()->json([
            'message' => 'A user with this email already exists.',
        ], 422);
    }

    $tempPassword = Str::random(10);

    $user = User::create([
        'name' => $lead->name,
        'email' => $lead->email,
        'password' => bcrypt($tempPassword),
        'role' => 'client',
    ]);

    ClientProfile::create([
        'user_id' => $user->id,
        'lead_id' => $lead->id,
        'phone' => $lead->phone,
    ]);

    $lead->update(['status' => 'converted']);

    Mail::to($user->email)->send(new ClientWelcomeMail($user, $tempPassword));

    return response()->json([
        'message' => 'Lead converted to client successfully',
        'client' => $user,
    ]);
}
}