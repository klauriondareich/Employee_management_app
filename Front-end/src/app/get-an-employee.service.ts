import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAnEmployeeService {
  base_url = "http://127.0.0.1:5000/";
  user_token = localStorage.getItem('user_token') ?? "";
  an_employee_details = "";
  httpOptions = {
    headers: new HttpHeaders({
      "x-access-token": this.user_token
    })
  };

  constructor( private http: HttpClient) { }

  // This func retrieves details of an employee
  getEmployeeDetails(public_id:string){
    let url = this.base_url + "api/v1/employee/"+public_id;
    return this.http.get(url, this.httpOptions)
  }
}
