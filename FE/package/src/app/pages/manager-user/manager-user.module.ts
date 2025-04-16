import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerUserComponent } from './manager-user.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
  const routes : Routes = [
    {
      path: '',
      component: ManagerUserComponent
    },
    {
      path: 'edit-user/:id',
      component: UserDetailComponent
    },
    {
      path: 'add-user',
      component: UserDetailComponent 
    }
  ]


@NgModule({
  declarations: [ManagerUserComponent,UserDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    
  ]
})
export class ManagerUserModule { }
