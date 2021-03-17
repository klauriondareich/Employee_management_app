import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://127.0.0.1:5000/api/v1/login";
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'ImtsYXVyaW9uZGFyZWljaEBnbWFpbC5jb20i.YFKNZQ.xDfheRc661QcXvOE'
    })
  }
  
  constructor( private http:HttpClient) { }

  // This func logins the user
  loginUser(data:object){
    return this.http.post(this.url, data, this.httpOptions)
  }
}
