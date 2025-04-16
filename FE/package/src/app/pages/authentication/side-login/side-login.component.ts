import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { UserLogged } from 'src/app/core/utils/userlogged';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  email : any;
  pass: any;
  constructor( private router: Router,
    private service : LoginService,
    private userService: UserService
  ) {}

  onChange(event: any) {
    this.email = event.target.value
  }
  onChangePass(event: any) {
    this.pass = event.target.value
  }
  submit() {
    let formData = {
      Email: this.email,
      Password: this.pass
    }
  console.log(formData);
  this.service.Login(formData).subscribe(res => {
 
    console.log(res);
    if(res == null){
      alert('Email hoac mat khau khong dung');
    }else{
      if(res.status == 1){
        let userLogged: UserLogged = new UserLogged();
        console.log(res);
   
              userLogged.setCurrentUser(
                res.token,
                res.userid,
                JSON.stringify(res.roles),
              );
             window.location.href = '/home';
             let formData = {
              LastLogin : new Date
             }
             this.userService.UpdateUser(formData, res.userid).subscribe(res => {

             })
      }
      else{
        alert("Tài khoản của bạn chưa được kích hoạt! ")
         this.router.navigate(['/login']);
      }
    }
  })
  }
}
