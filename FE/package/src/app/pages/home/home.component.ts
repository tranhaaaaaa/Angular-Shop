import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/model/db.model';
import { CartService } from 'src/app/core/services/cart.service';
import { CartitemService } from 'src/app/core/services/cartitem.service';
import { ItemService } from 'src/app/core/services/item.service';
import { ItemdetailService } from 'src/app/core/services/itemdetail.service';
import { UserLogged } from 'src/app/core/utils/userlogged';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public listItem: Item[] = [];
  public filteredItems: Item[] = [];
  public searchTerm: string = '';
  public sortBy: string = 'name-asc';
  public userLogged = new UserLogged();
  constructor(
    private service: ItemService,
    private serviceItemDetail: ItemdetailService,
    private serviceCart : CartService,
    private route : Router,
    private serviceCartItem : CartitemService
  ) {}

  vouchers = [
    { title: 'Giảm 10% cho đơn từ 500K', discount: 10, expiry: new Date('2025-05-01') },
    { title: 'Miễn phí vận chuyển toàn quốc', discount: 100, expiry: new Date('2025-04-30') },
    { title: 'Giảm 15% cho khách mới', discount: 15, expiry: new Date('2025-05-15') }
  ];

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.service.getAllItem().subscribe(data => {
      this.listItem = data.value;
      this.applyFilters();
    });
  }

  applyFilters() {
    let items = [...this.listItem];

    if (this.searchTerm) {
      items = items.filter(item =>
        item.ItemName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    switch (this.sortBy) {
      case 'name-asc':
        items.sort((a, b) => a.ItemName.localeCompare(b.ItemName));
        break;
      case 'name-desc':
        items.sort((a, b) => b.ItemName.localeCompare(a.ItemName));
        break;
      case 'price-asc':
        items.sort((a, b) => a.Itemdetails[0]?.ItemPrice - b.Itemdetails[0]?.ItemPrice);
        break;
      case 'price-desc':
        items.sort((a, b) => b.Itemdetails[0]?.ItemPrice - a.Itemdetails[0]?.ItemPrice);
        break;
    }

    this.filteredItems = items;
  }

  addToCart(product: any) {
    const userId = this.userLogged.getCurrentUser()?.userId;
  
   if(userId){
    this.serviceCart.getCartByQuery(`$filter=UserId eq ${userId}&$expand=Cartitems($filter=ItemId eq ${product.ItemId})`).subscribe(cartItem => {
      debugger;
      
      if (cartItem.value.length !== 0) {
        const cartItems = cartItem.value[0];
  
        const existingItem = cartItems.Cartitems.some((item: any) => item.ItemId === product.ItemId);
  
        if (existingItem) {
          const cartItemToUpdate = cartItems.Cartitems.find((item: any) => item.ItemId === product.ItemId);
          cartItemToUpdate.Quantity = cartItemToUpdate.Quantity + 1;  
          this.serviceCartItem.UpdateCartitem(cartItemToUpdate,cartItemToUpdate.CartItemId).subscribe(() => {
            alert('Sản phẩm đã được cập nhật trong giỏ.');
          });
        } else {
          let formData = {
            CartId: cartItems.CartId,
            ItemId: product.ItemId,
            ItemDetailId: product.Itemdetails[0].ItemDetailId,
            Quantity: 1
          };
  
          this.serviceCartItem.CreateCartitem(formData).subscribe(() => {
            alert('Sản phẩm được thêm vào giỏ.');
          });
        }
      } else {
        const newCartItem = {
          UserId: +userId,
        };
  
        this.serviceCart.CreateCart(newCartItem).subscribe(data => {
          let formData = {
            CartId: data.CartId,
            ItemId: product.ItemId,
            ItemDetailId: product.Itemdetails[0].ItemDetailId,
            Quantity: 1
          };
          console.log("product",product)
          this.serviceCartItem.CreateCartitem(formData).subscribe(() => {
            alert('Giỏ hàng đã được tạo và sản phẩm được thêm vào giỏ.');
          });
        });
      }
    });
   }
   else{
      this.route.navigate(['/authentication/login']);
   }
  }
  
  
}