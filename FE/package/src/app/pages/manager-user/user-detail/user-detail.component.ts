import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/model/db.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserRoleService } from 'src/app/core/services/userrole.service';
interface Status {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  public userDetail : User = new User();
  idUser: any;
  public userStatus: number;
  public roleValue : number;
  role: Status[] = [
    { value: 2, viewValue:'User' },
    { value: 1, viewValue: 'Admin' },

  ];
  roleU : any;
  stt: Status[] = [
    { value: 0, viewValue: 'Ngưng hoạt động' },
    { value: 1, viewValue: 'Hoạt động' },
  ];
  constructor(private route : ActivatedRoute,
    private service : UserService,
    private router : Router,
    private userRoleService : UserRoleService
  ){}
  ngOnInit(): void {
    this.onGetUrlandCallingApi();
  }
  onGetUrlandCallingApi() {
    this.route.params.subscribe((params) => {
      this.idUser = params['id'];
      this.onGetData(this.idUser);
    });
  }
  onGetData(id : any) {
    if(this.idUser){
      this.service.getUserById(id).subscribe((data) => {
        this.userDetail = data.value[0];
        this.userStatus = this.userDetail.Status;
        this.roleValue = this.userDetail.UserRoles[0].RoleId
        this.roleU = this.userDetail.UserRoles[0].RoleId

      })
    }
    else{
      this.userDetail = new User();
    }
  }
  onInputRole(value: any){
    this.roleU = value;
  }
    onInputChange(value: any, eventValue: any) {
    let valueReal = '';
    if (value == 'Status' || value == 'Role') {
      valueReal = eventValue;
    } else {
      valueReal = eventValue.target.value;
    }
    const data = { ...this.userDetail, [value]: valueReal };
    this.userDetail = data;
  }
  onSubmit(){
    if(this.idUser){
      this.service.UpdateUser(this.userDetail, this.idUser).subscribe(res => {
        this.userRoleService.getUserRoleByQuery(`$filter=UserId eq ${this.idUser}`).subscribe(resRole => 
          {
            if(resRole.value[0]){
              
              let formData = {
                RoleId : parseInt(this.roleU),
                UserId : parseInt(this.idUser)
              }
              this.userRoleService.UpdateUserRole(formData,resRole.value[0].Id).subscribe(res => {
                this.onGetData(this.idUser);
                alert('Thành công ');
              })
            }
            else{
              let formData = {
                RoleId : parseInt(this.roleU),
                UserId : parseInt(this.idUser)
              }
              this.userRoleService.CreateUserRole(formData).subscribe(res => {
                this.onGetData(this.idUser);
                alert('Thành công ');
              })
            }
          })
        // this.onGetData(this.idUser);
      })
    }
    if(!this.idUser){
      this.service.CreateUser(this.userDetail).subscribe(res => {
        let formData = {
          RoleId : parseInt(this.roleU),
          UserId : res.UserId
        }
        this.userRoleService.CreateUserRole(formData).subscribe(reRoles => {
          this.onGetData(this.idUser);
          alert('Thành công ');
          this.router.navigate(['list-users/edit-user/' + res.UserId]);
        })
        })
      }
  }
}
