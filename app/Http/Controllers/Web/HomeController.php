<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Katalog;

class HomeController extends Controller
{
    public function homePage(Request $request)
    { 
        return view('pages.katalog', [
            'showHero' => true
        ]);
    }

    public function katalogPage(Request $request)
    {
        return view('pages.katalog', [
            'showHero' => false
        ]);
    }
}
