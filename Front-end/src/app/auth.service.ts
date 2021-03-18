import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http"
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor( private http:HttpClient, private jwtHelper:JwtHelperService) { }

  // This func logins the user
  loginUser(data:any){
    let credentials = data.username + ":" + data.password;
    credentials = window.btoa(credentials);
    let encoded = 'Basic '+credentials;
    // console.log("encode", encoded);
    // let headers = new HttpHeaders({'Authorization':encoded});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: encoded
      })
    };
    let url = "http://127.0.0.1:5000/api/v1/login";
    return this.http.post(url, data, httpOptions)
  }

  // This func registers the user
  registerUser(data:object){
    let url = "http://127.0.0.1:5000/api/v1/signup";
    return this.http.post(url, data)
  }

  // Checks if the user is authenticated
  isAuthenticated(){  
    let user_token = localStorage.getItem("user_token") ?? undefined;
    return !this.jwtHelper.isTokenExpired(user_token);
  }
}
