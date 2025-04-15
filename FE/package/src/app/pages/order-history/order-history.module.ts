import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

const route : Routes = [
  {
    path: '',
    component: OrderHistoryComponent
  }
]

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(route)
  ]
})
export class OrderHistoryModule { }
