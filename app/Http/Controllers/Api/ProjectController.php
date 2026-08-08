<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Admin: list all projects
    public function index()
    {
        return Project::with(['client', 'service'])->latest()->get();
    }

    // Admin: create a project for a client
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:users,id',
            'service_id' => 'nullable|exists:services,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,review,completed',
            'progress' => 'required|integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project created',
            'project' => $project,
        ], 201);
    }

    // Admin: update a project
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:not_started,in_progress,review,completed',
            'progress' => 'sometimes|integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated',
            'project' => $project,
        ]);
    }

    // Client: list their own projects
    public function myProjects(Request $request)
    {
        return Project::with('service')
            ->where('client_id', $request->user()->id)
            ->latest()
            ->get();
    }

    // Helper: list all clients (for admin dropdown when creating project)
    public function clients()
    {
        return User::where('role', 'client')->get(['id', 'name', 'email']);
    }
}