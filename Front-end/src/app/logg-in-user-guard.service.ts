import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoggInUserGuardService {

  constructor( private router:Router, private auth:AuthService) { }

  // Routes guard for authenticated users
  canActivate(){
    if (this.auth.isAuthenticated()){
      this.router.navigate(['/employees']);
      return false
    }
    return true
  };
}
