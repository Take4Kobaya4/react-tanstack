<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $todo = $request->user()->todos()->create($request->only('title', 'description'));

        return response()->json([
            'message' => 'Todo created successfully.',
            'todo' => $todo,
        ], 201);
    }

    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // Validate the request data
        $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|nullable|string',
            'completed' => 'sometimes|boolean',
        ]);

        $todo->update($request->only('title', 'description', 'completed'));

        return response()->json([
            'message' => 'Todo updated successfully.',
            'todo' => $todo,
        ]);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully.',
        ], 204);
    }
}
