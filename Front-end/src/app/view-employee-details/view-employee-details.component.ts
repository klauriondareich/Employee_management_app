import { Component, OnInit } from '@angular/core';
import { GetAnEmployeeService } from '../get-an-employee.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html', 
  styleUrls: ['./view-employee-details.component.css']
})
export class ViewEmployeeDetailsComponent implements OnInit {

  employee:any = "";

  constructor( private an_employee:GetAnEmployeeService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let public_id = params.userId;
      this.viewEmployee(public_id)
    });
  }

    // This func allows to view an employee details
    viewEmployee(public_id:string){
      this.an_employee.getEmployeeDetails(public_id).subscribe((data:any) =>{
        this.employee = data.employee;
      })
    }
}
