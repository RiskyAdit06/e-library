<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function favoritePage(Request $request)
    { 
        return view('pages.favorite-katalog', [
            'showHero' => false
        ]);
    }
}
