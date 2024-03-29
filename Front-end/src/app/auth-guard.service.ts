import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private router:Router, private auth:AuthService) { }

  // Routes guard to manange routes access
  canActivate(){
    if (this.auth.isAuthenticated()){
      return true
    }
    return this.router.navigate(['']);
  };
}
