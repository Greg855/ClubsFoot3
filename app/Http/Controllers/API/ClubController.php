<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Club::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'city' => 'required|string',
            'matches_played' => 'required|integer',
            'matches_won' => 'required|integer',
            'matches_lost' => 'required|integer',
            'matches_drawn' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(['name','city','matches_played','matches_won','matches_lost','matches_drawn']);
        $data['user_id'] = Auth::id();

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-\_\.]/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        $club = Club::create($data);

        return response()->json(['message' => 'Club created', 'data' => $club], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $club = Club::with('joueurs')->find($id);
        if (!$club) {
            return response()->json(['error' => 'Not found'], 404);
        }

        return response()->json($club, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $club = Club::find($id);
        if (!$club) {
            return response()->json(['error' => 'Not found'], 404);
        }

        if ($club->user_id != Auth::id() && (!Auth::check() || Auth::user()->role != 'admin')) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'matches_played' => 'sometimes|required|integer',
            'matches_won' => 'sometimes|required|integer',
            'matches_lost' => 'sometimes|required|integer',
            'matches_drawn' => 'sometimes|required|integer',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(['name','city','matches_played','matches_won','matches_lost','matches_drawn']);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-\_\.]/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        $club->update($data);

        return response()->json(['message' => 'Club updated', 'data' => $club], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $club = Club::find($id);
        if (!$club) {
            return response()->json(['error' => 'Not found'], 404);
        }

        if ($club->user_id != Auth::id() && (!Auth::check() || Auth::user()->role != 'admin')) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $club->delete();
        return response()->json(['message' => 'Club deleted'], 200);
    }
}
