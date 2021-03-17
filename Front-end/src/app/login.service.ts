import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:4000/config";

  constructor( private http:HttpClient) { }

  // This func logins the user
  loginUser(data:object){
    return this.http.post(this.url, data)
  }
}
