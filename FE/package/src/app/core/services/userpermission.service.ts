import { Injectable } from '@angular/core';
import { UserLogged } from '../utils/userlogged';

@Injectable({
  providedIn: 'root'
})
export class UserpermissionService {
  private roles: string[] = []; // Roles of the current user
  private roleIds: string[] = []; // Roles of the current user
  constructor() { }
  asRole(requiredRoles: string[]): boolean {
    let userLogged: UserLogged = new UserLogged();
    // Initialize roles for the user
    this.roles = userLogged.getRoles();
    const requiredTrimmed = requiredRoles.map((role) =>
      role.trim().toLowerCase()
    );
    return this.roles.some((role) =>
      requiredTrimmed.includes(role.trim().toLowerCase())
    );
  }

  hasRoleId(requiredRoles: any[]): boolean {
    let userLogged: UserLogged = new UserLogged();
    // Initialize roles for the user
    this.roleIds = userLogged.getUserRoleIds();
    const requiredTrimmed = requiredRoles.map((role) =>
      role.toString().trim().toLowerCase()
    );
    return this.roleIds.some((role) =>
      requiredTrimmed.includes(role.toString().trim().toLowerCase())
    );
  }
}
