import { Component, OnInit } from '@angular/core';
import {GetAllEmployeesService } from '../get-all-employees.service'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  constructor( private getAllEmployees:GetAllEmployeesService) {
    getAllEmployees.getAllEmployees()
   }

  ngOnInit(): void {
  }

}
