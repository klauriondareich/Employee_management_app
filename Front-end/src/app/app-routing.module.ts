import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component'
import {LoginComponent} from './login/login.component'
import {ListEmployeesComponent} from './list-employees/list-employees.component'
import {ViewEmployeeDetailsComponent} from './view-employee-details/view-employee-details.component'

const routes: Routes = [
  {path: "sign_up",  component: SignUpComponent},
  {path: "login",  component: LoginComponent},
  {path: "employees",  component: ListEmployeesComponent},
  {path: "employees/:userId",  component: ViewEmployeeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
