<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => [
                'required', 'confirmed',
                'min:8', 'regex:/[a-z]/', 'regex:/[A-Z]/', 'regex:/[0-9]/'
            ]
        ]);

        $user = User::create([
            'email' => htmlspecialchars($request->email, ENT_QUOTES, 'UTF-8'),
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        return response()->json(['message' => 'Register success', 'user' => $user]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Login gagal'], 401);
            }

            $user = Auth::user();

            $customClaims = [
                'sub' => $user->id,
                'role' => $user->role,
                'is_admin' => $user->role === 'admin'
            ];

            $token = JWTAuth::claims($customClaims)->attempt($credentials);

        } catch (JWTException $e) {
            return response()->json(['message' => 'Terjadi kesalahan server'], 500);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token
        ]);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout success']);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'new_password' => [
                'required',
                'min:8',
                'regex:/[a-z]/',      // minimal ada satu huruf kecil
                'regex:/[A-Z]/',      // minimal ada satu huruf besar
                'regex:/[0-9]/'       // minimal ada satu angka
            ],
        ]);

        // (optional) jika ingin cek password lama:
        // $request->validate([
        //     'current_password' => 'required'
        // ]);
        // if(!Hash::check($request->current_password, $user->password)) {
        //     return response()->json(['message' => 'Password lama salah'], 403);
        // }

        // Ganti password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password berhasil diganti']);
    }
}
