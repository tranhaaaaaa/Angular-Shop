import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

const route : Routes = [
  {
    path: '',
    component:HomeComponent
  },
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatCardModule,
    RouterModule.forChild(route),
  ]
})
export class HomeModule { }
