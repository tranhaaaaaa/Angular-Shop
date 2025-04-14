import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { Itemdetail } from 'src/app/core/model/db.model';

const route : Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'item-detail/:id',
    component:ItemDetailComponent
  },
]

@NgModule({
  declarations: [HomeComponent,ItemDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatCardModule,
    RouterModule.forChild(route),
  ]
})
export class HomeModule { }
