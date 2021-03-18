import { Component, OnInit } from '@angular/core';
import { GetAllEmployeesService } from '../get-all-employees.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  all_employees:any = "";

  constructor( private getAll:GetAllEmployeesService, private spinner: NgxSpinnerService) {

    // displays the loader
    this.spinner.show();

    this.getAll.retrieveAllEmployees().subscribe((data:any) =>{
      this.all_employees = data.employees;
      // hides the loader
      this.spinner.hide();
    })
   }

  ngOnInit(): void {
  }
}
