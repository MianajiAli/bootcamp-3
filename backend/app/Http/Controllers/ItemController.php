<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * Display a listing of the items.
     */
    public function index()
    {
        $items = Item::all();
        return response()->json([
            'status' => true,
            'message' => 'Items retrieved successfully',
            'data' => $items
        ], 200);
    }

    /**
     * Display the specified item.
     */
    public function show($id)
    {
        $item = Item::findOrFail($id);
        return response()->json([
            'status' => true,
            'message' => 'Item found successfully',
            'data' => $item
        ], 200);
    }

    /**
     * Store a newly created item in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string', // Add validation for the title field
            'name' => 'required|array',   // Ensure name is an array
            'name.*' => 'boolean',        // Ensure all values in the array are booleans
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $item = Item::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Item created successfully',
            'data' => $item
        ], 201);
    }

    /**
     * Update the specified item in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string', // Add validation for the title field (if provided)
            'name' => 'sometimes|array',   // Ensure name is an array (if provided)
            'name.*' => 'boolean',         // Ensure all values in the array are booleans
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $item = Item::findOrFail($id);
        $item->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Item updated successfully',
            'data' => $item
        ], 200);
    }

    /**
     * Remove the specified item from storage.
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();

        return response()->json([
            'status' => true,
            'message' => 'Item deleted successfully'
        ], 204);
    }
}
