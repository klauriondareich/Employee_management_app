import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { AuthGuardService as AuthGuard } from './auth-guard.service';
 
const routes: Routes = [
  {path: "sign_up",  component: SignUpComponent},
  {path: "login",  component: LoginComponent},
  {
    path: "employees",  
    component: ListEmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employees/:userId",  
    component: ViewEmployeeDetailsComponent,
    canActivate: [AuthGuard]
  },
  {path: "**",  component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
