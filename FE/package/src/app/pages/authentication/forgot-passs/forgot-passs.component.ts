import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-forgot-passs',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-passs.component.html',
  styleUrl: './forgot-passs.component.scss'
})
export class ForgotPasssComponent {
  email : any;
  constructor( private router: Router,
    private service : LoginService
  ) {}

  onChange(event: any) {
    this.email = event.target.value
  }
  
  submit() {
    let formData = {
      Email: this.email,
    }
    this.service.Forgotpass(formData).subscribe((data) => {
      alert('Đổi mật khẩu thành công, hãy kiểm tra email');
    },
    (err) => {
      alert('Đổi mật khẩu thành công, hãy kiểm tra email');

    })
  
  }
}