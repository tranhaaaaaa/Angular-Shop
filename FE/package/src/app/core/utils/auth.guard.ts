import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserLogged } from './userlogged';
import { UserpermissionService } from '../services/userpermission.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: UserpermissionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userLogged: UserLogged = new UserLogged();

    if (userLogged.isLogged()) {
      const currentUser = userLogged.getCurrentUser();

      if (!this.service.asRole(["admin"])) {
        console.log('User is logged in but does not have admin rights');
        this.router.navigate(['/home']);
        return false;
      }

      console.log('User has admin rights');
      return true;

    } else {
      console.log('User not logged in');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
