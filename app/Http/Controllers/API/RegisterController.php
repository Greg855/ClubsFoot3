<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
     /**

     * Register api

     *

     * @return \Illuminate\Http\Response

     */
        // If the request is authenticated, revoke the current access token.
    /**

     * Register api

     *

     * @return \Illuminate\Http\Response

     */

    public function register(Request $request)

     {
 
         $validator = Validator::make($request->all(), [
 
             'name' => 'required',
 
             'email' => 'required|email',
 
             'password' => 'required',
 
             'c_password' => 'required|same:password',
 
         ]);
 
    
 
         if($validator->fails()){
 
             return $this->sendError('Validation Error.', $validator->errors());       
 
         }
 
    
 
         $input = $request->all();
 
         $input['password'] = bcrypt($input['password']);
 
         $user = User::create($input);
 
         $success['token'] =  $user->createToken('MyApp')->plainTextToken;
 
         $success['name'] =  $user->name;
        // $success['id'] =  $user->id;  la réponse lors de l'enregistrement peut aussi être l'id et le token
 
    
 
         return response()->json([$success, "message"=> 'User register successfully.']);

 
     }


    /**

     * Login api

     *

     * @return \Illuminate\Http\Response

     */

    public function login(Request $request)
 
     {
 
         if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
 
             $user = Auth::user(); 
 
             $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
 
             $success['name'] =  $user->name;
 
             return response()->json([$success, "message"=> 'User login successfully.']);
 
         } 
 
         else{ 

            return response()->json([
                'success' => false,
                'message' => 'Unauthorised',
                'errors' => ['error' => 'Unauthorised']
            ], 401);
 
         } 
 
     }


    /**

     * Logout api

     *

     * @return \Illuminate\Http\Response

     */

    public function logout(Request $request)

    {
        $user = $request->user();

        if ($user) {
            if (method_exists($user, 'currentAccessToken') && $user->currentAccessToken()) {
                $token = $user->currentAccessToken();
                if (is_object($token) && method_exists($token, 'delete')) {
                    $token->delete();
                } elseif (method_exists($user, 'tokens')) {
                    // fallback for transient tokens
                    $user->tokens()->delete();
                }
            } elseif (method_exists($user, 'tokens')) {
                $user->tokens()->delete();
            }

            return response()->json(["message" => 'User logged out successfully.']);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorised',
            'errors' => ['error' => 'Unauthorised']
        ], 401);
    }

}
