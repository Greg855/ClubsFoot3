<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Club;
use App\Models\Joueur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::all();
        return view('clubs.index', compact('clubs'));
    }

    public function create()
    {
        return view('clubs.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'city' => 'required',
            'matches_played' => 'required',
            'matches_won' => 'required',
            'matches_lost' => 'required',
            'matches_drawn' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('warning', __('general.ChampsRequis'));
        }

        $data = $request->all();
        $data['user_id'] = auth()->id();

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-_]/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        Club::create($data);
        return redirect('/')->with('success', __('general.clubAjouter'));
    }

    public function show($id)
    {
        $club = Club::findOrFail($id);

        return view('clubs.show', compact('club'));
    }

    public function edit($id)
    {
        $club = Club::findOrFail($id);
        if ($club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }

        return view('clubs.edit', compact('club'));
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);
        if ($club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'city' => 'required',
            'matches_played' => 'required',
            'matches_won' => 'required',
            'matches_lost' => 'required',
            'matches_drawn' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('warning', __('general.ChampsRequis'));
        }

        if ($club->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->all();
        $data['user_id'] = $club->user_id;

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-_]/', '_', $image->getClientOriginalName());
            $path = $image->storeAs('images', $fileName, 'public');
            $data['image'] = $path;
        }

        $club->update($data);
        return redirect('/')->with('success', __('general.clubModifier'));
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        if ($club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }
        $club->delete();
        return redirect('/')->with('success', __('general.clubSupprimer'));
    }

    public function autocomplete(Request $request)
    {
        $search = $request->search;
        $clubs = Club::orderBy('name', 'asc')
            ->select('id', 'name')
            ->where('name', 'LIKE', '%' . $search . '%')
            ->get();
        $response = array();
        foreach ($clubs as $club) {
            $response[] = array(
                'value' => $club->id,
                'label' => $club->name
            );
        }
        return response()->json($response);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $clubs = Club::where('name', 'LIKE', '%' . $query . '%')->get();
        return view('search', compact('clubs', 'query'));
    }
}
