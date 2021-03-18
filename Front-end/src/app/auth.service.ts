import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http"
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  base_url = "http://127.0.0.1:5000/";

  constructor( private http:HttpClient, private jwtHelper:JwtHelperService, private router:Router) { }
  
  // This func logins the user
  loginUser(data:any){
    let credentials = data.username + ":" + data.password;
    credentials = window.btoa(credentials);
    let encoded = 'Basic '+credentials;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: encoded
      })
    };
    let url = this.base_url + "api/v1/login";
    return this.http.post(url, data, httpOptions)
  }

 // Allows users to logout
  logout(){
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    this.router.navigate([""])
  }

  // This func registers the user
  registerUser(data:object){
    let url = this.base_url + "api/v1/signup";
    return this.http.post(url, data)
  }

  // Checks if the user is authenticated
  isAuthenticated(){  
    let user_token = localStorage.getItem("user_token") ?? undefined;
    return !this.jwtHelper.isTokenExpired(user_token);
  }
}
