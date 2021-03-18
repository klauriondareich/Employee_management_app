import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetAllEmployeesService {

  url = "";
  constructor( private http: HttpClient) { }

  // This fun retrieve all employees
  getAllEmployees(){
    return this.http.get(this.url)
  }

}
