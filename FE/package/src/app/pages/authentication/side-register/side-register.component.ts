import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User, UserRole } from 'src/app/core/model/db.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserRoleService } from 'src/app/core/services/userrole.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  public userDetail = new User();
  options = this.settings.getOptions();

  constructor(private settings: CoreService,
    private userService : UserService,
    private userRoleService : UserRoleService,
     private router: Router) {}
  onInputChange(value: any, eventValue: any) {
  
    let  valueReal = eventValue.target.value;
    
    const data = { ...this.userDetail, [value]: valueReal };
    this.userDetail = data;
  }

  submit() {
    this.userDetail.Status=1;
   console.log(this.userDetail);
   this.userService.getAllUser().subscribe(users => {
    const emailExists = users.value.some((u: any) => u.Email.toLowerCase() === this.userDetail.Email.toLowerCase());
  
    if (emailExists) {
      alert('Email này đã được sử dụng. Vui lòng dùng email khác.');
      return;
    }
  
    this.userService.CreateUser(this.userDetail).subscribe(newUser => {
      const formData = {
        UserId: newUser.UserId,
        RoleId:  2
      };
        console.log(formData);
      this.userRoleService.CreateUserRole(formData).subscribe(roleData => {
        console.log('User và role đã được tạo:', roleData);
        this.router.navigate(['/authentication/login']);
      },
      error => {
       alert('Có lỗi xảy ra!');
      });
    });
  });
}
}
