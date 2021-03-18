import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetAllEmployeesService {

  url = "http://127.0.0.1:5000/api/v1/employees";
  
  constructor( private http: HttpClient) { }

  // This fun retrieve all employees
  retrieveAllEmployees(){
    let user_token = localStorage.getItem('user_token') ?? "";
    const httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": user_token
      })
    };
    return this.http.get(this.url, httpOptions)
  }

}
