import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/model/db.model';
import { ItemService } from 'src/app/core/services/item.service';
import { UserLogged } from 'src/app/core/utils/userlogged';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  public listProduct : Item[] = [];
  public userLogged = new UserLogged();
  displayedColumns1: string[] = ['name','color', 'quantity', 'price', 'status','action'];
  dataSource1 = new MatTableDataSource<Item>(this.listProduct);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.onGetData();
  }
  constructor(private itemService : ItemService,
    private router : Router
  ){}
onGetData(){
  this.itemService.getItemByQuery(`$filter=CreatedBy eq ${this.userLogged.getCurrentUser().userId}&$expand=Itemdetails`).subscribe((data) => {
    this.listProduct = data.value;
    console.log(this.listProduct);
    this.dataSource1 = new MatTableDataSource<Item>(this.listProduct);
      this.dataSource1.paginator = this.paginator;
  })
}
onClickAddProduct(){
  this.router.navigate(['products/add-product']);
}
toggleStatus(data : any){
  // data.IsAvailable = !data.IsAvailable;
  // this.itemService.UpdateItem(data.ItemId,data).subscribe(data => {})
}
onEditProduct(data : any){
  this.router.navigate(['products/edit-product/' + data.ItemId]);
}
}
