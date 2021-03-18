import { Component, OnInit } from '@angular/core';
import {GetAllEmployeesService } from '../get-all-employees.service'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  all_employees:any = "";

  constructor( private getAll:GetAllEmployeesService) {

    this.getAll.retrieveAllEmployees().subscribe((data:any) =>{
      this.all_employees = data.employees;
      console.log("success", data)
    })

   }

  ngOnInit(): void {
  }

}
