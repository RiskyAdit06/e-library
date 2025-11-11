<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthContoller extends Controller
{
    public function loginPage()
    { 
        return view('auth.login'); 
    }
    public function registerPage()
    { 
        return view('auth.register');
    }
}
