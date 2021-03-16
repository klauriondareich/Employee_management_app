import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  url = "http://localhost:4000/config";

  constructor( private http: HttpClient) { }
  

  // this func register the user to the db
  registerUser(data:object){
    return this.http.post(this.url, data)
  }

}
