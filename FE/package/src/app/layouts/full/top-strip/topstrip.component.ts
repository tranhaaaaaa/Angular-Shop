import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserLogged } from 'src/app/core/utils/userlogged';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule,FormsModule,RouterModule,MaterialModule,MatIconModule],
    templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent {
    public userLogged = new UserLogged();
    constructor() { }
    onCartPage(){
        if(this.userLogged.isLogged()){
          window.location.href = '/cart'
        }else{
          window.location.href = '/authentication/login'
        }
      }
      onLogout(){
        this.userLogged.logout();
      }
}
