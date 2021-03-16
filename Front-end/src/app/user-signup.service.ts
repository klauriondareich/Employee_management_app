import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  url = "http://localhost:4000/config";

  constructor( private http: HttpClient) { }
  
  // This has to be removed
  getData(){
    return this.http.get(this.url)
  }

  // This func get data from sign_up form and save them to the database
  saveEmployeeInfo(data:object){
    return this.http.post(this.url, data)
  }

}
