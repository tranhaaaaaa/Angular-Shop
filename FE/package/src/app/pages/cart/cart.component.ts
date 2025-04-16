import { Component, OnInit } from '@angular/core';
import { Cartitem } from 'src/app/core/model/db.model';
import { CartService } from 'src/app/core/services/cart.service';
import { CartitemService } from 'src/app/core/services/cartitem.service';
import { ItemdetailService } from 'src/app/core/services/itemdetail.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderdetailService } from 'src/app/core/services/orderdetail.service';
import { UserLogged } from 'src/app/core/utils/userlogged';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  listCartItems: Cartitem[] = [];
  totalAmount: number = 0;
  defaultImage = 'https://cdn.tgdd.vn/Files/2018/08/27/1112860/66_800x450.jpg';
  columnsToDisplay = ['image', 'name', 'price', 'quantity', 'total', 'action'];
  public userLogged = new UserLogged();

  constructor(
    private service: CartService,
    private serviceCartItem: CartitemService,
    private serviceOrder: OrderService,
    private serviceOrderDetail: OrderdetailService,
    private serviceItemDetail: ItemdetailService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.service
      .getCartByQuery(
        `$filter=UserId eq ${this.userLogged.getCurrentUser()?.userId}`
      )
      .subscribe((data) => {
        if (data.value.length > 0) {
          this.serviceCartItem
            .getCartitemByQuery(
              `$filter=CartId eq ${data.value[0].CartId}&$expand=Item($expand=Itemimages,Itemdetails),Itemdetail`
            )
            .subscribe((dataItem) => {
              this.listCartItems = dataItem.value;
              this.updateTotal();
            });
        }
      });
  }
  updateItemDetailQuantity(itemDetailId: number, quantityPurchased: number) {
    this.serviceItemDetail.getItemdetailById(itemDetailId).subscribe((data) => {
      let formData = {
        Quantity: data.value[0].Quantity - quantityPurchased,
      };
      console.log('Quantity after puerchaets', formData);
      this.serviceItemDetail
        .UpdateItemdetail(formData, itemDetailId)
        .subscribe(() => {
          console.log(
            `Item detail ${itemDetailId} quantity reduced by ${quantityPurchased}`
          );
        });
    });
  }
  updateTotal() {
    this.totalAmount = this.listCartItems.reduce((sum, item) => {
      const price = item.Item.Itemdetails?.[0]?.ItemPrice || 0;
      const quantity = item.Quantity || 0;
      return sum + price * quantity;
    }, 0);
  }

  removeItem(itemToRemove: any) {
    console.log(itemToRemove);
    this.serviceCartItem
      .DeleteCartitem(itemToRemove.CartItemId)
      .subscribe(() => {
        this.loadCart();
      });
  }
  onPayment() {
    let formData = {
      OrderDate: new Date(),
      TotalPrice: this.totalAmount,
      UserId: parseInt(this.userLogged.getCurrentUser().userId),
    };
    this.serviceOrder.CreateOrder(formData).subscribe((data) => {
      for (let index = 0; index < this.listCartItems.length; index++) {
        const element = this.listCartItems[index];
        let formDataDetail = {
          OrderId: data.OrderId,
          Quantity: element.Quantity,
          ItemDetailId: element.ItemDetailId,
        };
        this.serviceOrderDetail
          .CreateOrderdetail(formDataDetail)
          .subscribe((data) => {
            const itemDetailId = element.ItemDetailId;
            const quantityPurchased = element.Quantity;

            this.updateItemDetailQuantity(itemDetailId, quantityPurchased);
          });
      }
      alert('Thành công ');
    });
  }
}
