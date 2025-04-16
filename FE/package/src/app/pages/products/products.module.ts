import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
const routes : Routes = [
  {
    path: '',
    component:ProductsComponent
  },
  {
    path: 'add-product',
    component:ProductDetailComponent
  },
  {
    path: 'edit-product/:id',
    component:ProductDetailComponent
  }
] 


@NgModule({
  declarations: [ProductsComponent,ProductDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)

  ]
})
export class ProductsModule { }
