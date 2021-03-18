import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllEmployeesService {

  base_url = "http://127.0.0.1:5000/";
  user_token = localStorage.getItem('user_token') ?? "";
  httpOptions = {
    headers: new HttpHeaders({
      "x-access-token": this.user_token
    })
  };

  constructor( private http: HttpClient) { }

  // This fun retrieves all employees
  retrieveAllEmployees(){
    let url = this.base_url + "api/v1/employees";
    return this.http.get(url, this.httpOptions)
  }

}
