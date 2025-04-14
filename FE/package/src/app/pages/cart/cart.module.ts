import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CartComponent } from './cart.component';
import { Router, RouterModule, Routes } from '@angular/router';
const route : Routes = [
  {
    path: '',
    component:CartComponent
  },
]

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(route),
    
  ]
})
export class CartModule { }
