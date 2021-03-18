import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'ImtsYXVyaW9uZGFyZWljaEBnbWFpbC5jb20i.YFKNZQ.xDfheRc661QcXvOE'
    })
  }

  constructor( private http: HttpClient) { }
  

  // this func register the user to the db
  registerUser(data:object){
    let url = "http://127.0.0.1:5000/api/v1/signup";
    return this.http.post(url, data)
  }

   // This func logins the user
   loginUser(data:object){
    let url = "http://127.0.0.1:5000/api/v1/login";
    return this.http.post(url, data, this.httpOptions)
  }
}
