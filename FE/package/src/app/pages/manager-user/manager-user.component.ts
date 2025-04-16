import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/db.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-manager-user',
  standalone : false,
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.scss'
})
export class ManagerUserComponent implements OnInit{
  public listUser : User[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource1 = new MatTableDataSource<User>(this.listUser);
  displayedColumns1: string[] = ['assigned','fullname', 'name', 'priority','latslogin', 'budget'];

  ngOnInit(): void {
    this.onGetData();
  }
constructor(private userService : UserService,
  private router : Router
){}
onGetData(){
  this.userService.getAllUser().subscribe((data) => {
    this.listUser = data.value;
    this.dataSource1 = new MatTableDataSource<User>(this.listUser);
  this.dataSource1.paginator = this.paginator;
  })
}
onDetailPage(element : any){
  this.router.navigate(['list-users/edit-user/' + element]);
}
onClickAdd(){
  this.router.navigate(['list-users/add-user']);

}
actionStatus(data: any, status: number) {
  let formData = {
    Status: status,
  }
  this.userService.UpdateUser(formData, data.UserId).subscribe(res => {
    this.onGetData();
    alert('Thành công ');
  })
}
}
