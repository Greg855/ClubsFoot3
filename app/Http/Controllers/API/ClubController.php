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
        $clubs = Club::all();
        // $clubs = Club:: paginate(5);
        return response()->json($clubs, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'city' => 'required',
            'matches_played' => 'required',
            'matches_won' => 'required',
            'matches_lost' => 'required',
            'matches_drawn' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        ]);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-\_\.]/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        $club =  Club::create([
            'name' => $request->input('name'),
            'city' => $request->input('city'),
            'matches_played' => $request->input('matches_played'),
            'matches_won' => $request->input('matches_won'),
            'matches_lost' => $request->input('matches_lost'),
            'matches_drawn' => $request->input('matches_drawn'),
            'image' => $fileName ?? null,
        ]);

        return response()->json([$club, 'message' => 'Club ajouté'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $club = Club::find($id);
        if (!$club) {
            return response()->json(['message' => 'Club non trouvée'], 404);
        }
        return response()->json($club, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $club = Club::find($id);
        return response()->json($club);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $club = Club::find($id);
        if (!$club) {
            return response()->json(['message' => 'Id not found'], 404);
        }

        // Allow partial updates; fields are validated only when present
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'matches_played' => 'sometimes|required|integer',
            'matches_won' => 'sometimes|required|integer',
            'matches_lost' => 'sometimes|required|integer',
            'matches_drawn' => 'sometimes|required|integer',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        // Handle uploaded image properly and store path
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-\_\.]*/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        $club->update($data);

        return response()->json(['success' => true, 'data' => $club->fresh(), 'message' => 'Club modifié avec succès'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $club = Club::findOrFail($id);
        $club->delete();
        return response()->json(null, 204);
    }

    public function autocomplete(Request $request)
    {
        $query = $request->input('query');
        // Rechercher les correspondances
        $clubs = Club::where('name', 'LIKE', "%{$query}%")->limit(10)->get();
        //dd($articles);
        return response()->json($clubs);
    }
}
