<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Joueur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\App;

class JoueurController extends Controller
{
    public function index()
    {
        $joueurs = Joueur::all();
        return view('joueurs.index', compact('joueurs'));
    }

    public function create()
    {
        $clubs_id = request()->query('clubs_id');
        if ($clubs_id) {
            $club = Club::findOrFail($clubs_id);
            return view('joueurs.create', compact('club'));
        } else {
            $clubs = Club::all();
            return view('joueurs.create', compact('clubs'));
        }
    }

    public function show($id)
    {
        $joueur = Joueur::findOrFail($id);
        return view('joueurs.show', compact('joueur'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position' => 'required',
            'name' => 'required',
            'country' => 'required',
            'matches_played' => 'required',
            'clubs_id' => 'required|exists:clubs,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('warning', __('general.ChampsRequis'));
        }

        $data = $request->all();
        $local = App::getLocale();
        App::setLocale('en');
        $data['position'] = __('general.' . $request->input('position'));
        $data['country'] = __('general.' . $request->input('country'));
        App::setLocale($local);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $data['image'] = $imageName;
        }
        Joueur::create($data);
        return redirect()->route('joueurs.index')->with('success', __('reussi'));
    }

    public function edit($id)
    {
        $joueur = Joueur::findOrFail($id);
        if ($joueur->club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }

        return view('joueurs.edit', compact('joueur'));
    }

    public function update(Request $request, $id)
    {
        $joueur = Joueur::findOrFail($id);
        if ($joueur->club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }
        $validator = Validator::make($request->all(), [
            'position' => 'required',
            'name' => 'required',
            'matches_played' => 'required',
            'country' => 'required',
            'clubs_id' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->with('warning', 'Tous les champs sont requis.');
        }
        $data = $request->all();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $data['image'] = $imageName;
        }
        $joueur->update($data);
        return redirect()->back()->with('success', 'Joueur Modifié avec succès');
    }

    public function destroy($id)
    {
        $joueur = Joueur::findOrFail($id);
        if ($joueur->club->user_id != auth()->id() && auth()->user()->role != 'admin') {
            abort(403, 'Unauthorized');
        }
        $joueur->delete();
        return redirect()->back();
    }
}
