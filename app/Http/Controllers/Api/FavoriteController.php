<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Book;

class FavoriteController extends Controller {
    public function toggle(Request $req, $bookId){
        $user = auth()->user();
        if(!$user){
            return response()->json(['message'=>'Unauthorized'],401);
        }
    
        $book = Book::find($bookId);
        if(!$book) return response()->json(['message'=>'Not found'],404);
    
        $exists = Favorite::where('user_id',$user->id)->where('book_id',$bookId)->first();
        if($exists){
            $exists->delete();
            return response()->json(['message'=>'Buku telah dihapus dari daftar favorit Anda']);
        } else {
            Favorite::create(['user_id'=>$user->id,'book_id'=>$bookId]);
            return response()->json(['message'=>'Berhasil Di Favorite']);
        }
    }    

    public function list(Request $req){
        $user = auth()->user();
        if(!$user){
            return response()->json(['message'=>'Unauthorized'],401);
        }
    
        // Query books favorit dengan search optional
        $booksQuery = $user->booksFavorite()
            ->when($req->search, fn($q) => $q->where('name', 'like', "%{$req->search}%"));
    
        // Pagination 5 item per page
        $books = $booksQuery->paginate(5);
    
        if($books->isEmpty()){
            return response()->json([
                'message' => 'Tidak ada buku favorit',
                'data' => [],
                'pagination' => [
                    'total' => 0,
                    'per_page' => 5,
                    'current_page' => $req->page ?? 1,
                    'last_page' => 0,
                ]
            ]);
        }
    
        return response()->json([
            'message' => 'Success',
            'data' => $books->items(),
            'pagination' => [
                'total' => $books->total(),
                'per_page' => $books->perPage(),
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
            ]
        ]);
    }    
}