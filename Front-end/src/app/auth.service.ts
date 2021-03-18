import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ''
    })
  }
  
  constructor( private http:HttpClient) { }

  // This func logins the user
  loginUser(data:object){
    let url = "http://127.0.0.1:5000/api/v1/login";
    return this.http.post(url, data, this.httpOptions)
  }

  // This func registers the user
  registerUser(data:object){
    let url = "http://127.0.0.1:5000/api/v1/signup";
    return this.http.post(url, data)
  }
}
