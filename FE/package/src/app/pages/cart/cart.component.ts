import { Component, OnInit } from '@angular/core';
import { Cartitem } from 'src/app/core/model/db.model';
import { CartService } from 'src/app/core/services/cart.service';
import { CartitemService } from 'src/app/core/services/cartitem.service';
import { UserLogged } from 'src/app/core/utils/userlogged';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listCartItems: Cartitem[] = [];
  totalAmount: number = 0;
  defaultImage = 'https://cdn.tgdd.vn/Files/2018/08/27/1112860/66_800x450.jpg';
  columnsToDisplay = ['image', 'name', 'price', 'quantity', 'total', 'action'];
  public userLogged = new UserLogged();

  constructor(
    private service: CartService,
    private serviceCartItem: CartitemService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.service.getCartByQuery(`$filter=UserId eq ${this.userLogged.getCurrentUser()?.userId}`).subscribe(data => {
      if (data.value.length > 0) {
        this.serviceCartItem.getCartitemByQuery(`$filter=CartId eq ${data.value[0].CartId}&$expand=Item($expand=Itemimages,Itemdetails)`).subscribe(dataItem => {
          this.listCartItems = dataItem.value;
          this.updateTotal();
        });
      }
    });
  }

  updateTotal() {
    this.totalAmount = this.listCartItems.reduce((sum, item) => {
      const price = item.Item.Itemdetails?.[0]?.ItemPrice || 0;
      const quantity = item.Quantity || 0;
      return sum + (price * quantity);
    }, 0);
  }

  removeItem(itemToRemove: any) {
    console.log(itemToRemove);
    this.serviceCartItem.DeleteCartitem(itemToRemove.CartItemId).subscribe(() => {
      this.loadCart();
    })
  }
}
