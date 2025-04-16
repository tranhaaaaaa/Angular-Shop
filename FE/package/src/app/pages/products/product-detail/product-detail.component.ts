import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Itemdetail } from 'src/app/core/model/db.model';
import { ItemService } from 'src/app/core/services/item.service';
import { ItemdetailService } from 'src/app/core/services/itemdetail.service';
import { UserLogged } from 'src/app/core/utils/userlogged';
interface Status {
  value: boolean;
  viewValue: string;
}
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  public productDetail : Item ;
  public itemDetail : Itemdetail = new Itemdetail();
  public userLogged = new UserLogged();
  status : boolean =true;
  public idProduct : any
  stt: Status[] = [
    { value: false, viewValue: 'Hết hàng' },
    { value: true, viewValue: 'Còn hàng' },
  ];
  constructor(private itemService : ItemService,
    private itemDetailService : ItemdetailService,
    private route : ActivatedRoute,
    private router : Router
  ){}
  ngOnInit(): void {
    this.onGetUrlandCallingApi();
  }
  onGetUrlandCallingApi() {
    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];
      this.onGetData(this.idProduct);
    });
  }
  onGetData(id : any) {
    if(this.idProduct){
      this.itemService.getItemById(id).subscribe((data) => {
        this.productDetail = data.value[0]; 
        this.status = this.productDetail.IsAvailable;
      });
    }
    else{
      // this.productDetail Item;
    }
  }
  onInputChange(value: any, eventValue: any) {

    let valueReal = '';
    if (value == 'IsAvailable') {
      valueReal = eventValue;
    } else {
      valueReal = eventValue.target.value;
    }
    const data = { ...this.productDetail, [value]: valueReal };
    this.productDetail = data;
  }
  onInputChangeItemDetail(value: any, eventValue: any) {

    let valueReal = '';
    
      valueReal = eventValue.target.value;
    const data = { ...this.itemDetail, [value]: valueReal };
    this.itemDetail = data;
  }
  onSubmit() {
    console.log(this.productDetail);

    if(!this.idProduct){
      if(this.productDetail.IsAvailable == undefined || this.productDetail.IsAvailable == null){
        this.productDetail.IsAvailable = true;
      }
    
      this.productDetail.CreatedBy = this.userLogged.getCurrentUser().userId;
      this.productDetail.CreatedAt = new Date();
      this.itemService.CreateItem(this.productDetail).subscribe(data => {
        this.itemDetail.ItemId = data.ItemId;
        this.itemDetailService.CreateItemdetail(this.itemDetail).subscribe(data2 => {
          alert('Thành công ');
          this.router.navigate(['products/edit-product/' + data.ItemId]);
      
        })
      })
     }
     else{
      this.itemService.UpdateItem(this.productDetail, this.idProduct).subscribe(data => {
        console.log(this.productDetail.Itemdetails[0].ItemDetailId);
       this.itemDetailService.UpdateItemdetail(this.itemDetail,this.productDetail.Itemdetails[0].ItemDetailId).subscribe(data => {
        alert('Thành công ');
       })
      })
     }
    }
}
