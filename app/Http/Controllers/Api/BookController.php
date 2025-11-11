<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $books = Book::query()
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->paginate(6);
        return response()->json($books);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|max:2048'
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        $path = $request->file('image')->store('uploads', 'public');

        $book = Book::create([
            'name' => htmlspecialchars($request->name, ENT_QUOTES, 'UTF-8'),
            'description' => htmlspecialchars($request->description, ENT_QUOTES, 'UTF-8'),
            'image' => $path,
            'user_id' => Auth::id()
        ]);

        return response()->json(['message' => 'Book created', 'book' => $book]);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:2048',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        $data = [];
        if ($request->has('name')) {
            $data['name'] = htmlspecialchars($request->name, ENT_QUOTES, 'UTF-8');
        }
        if ($request->has('description')) {
            $data['description'] = htmlspecialchars($request->description, ENT_QUOTES, 'UTF-8');
        }
        if ($request->hasFile('image')) {
            // Hapus file lama jika ada
            if ($book->image && Storage::disk('public')->exists($book->image)) {
                Storage::disk('public')->delete($book->image);
            }
            $path = $request->file('image')->store('uploads', 'public');
            $data['image'] = $path;
        } else {
            // Jika tidak ada file image baru, simpan nilai lama
            $data['image'] = $book->image;
        }

        $book->update($data);

        // Ambil ulang data terbaru setelah update
        $book->refresh();

        return response()->json(['message' => 'Book updated', 'book' => $book]);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        if ($book->image && Storage::disk('public')->exists($book->image)) {
            Storage::disk('public')->delete($book->image);
        }
        $book->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
