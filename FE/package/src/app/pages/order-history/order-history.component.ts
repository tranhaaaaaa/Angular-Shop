import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/model/db.model';
import { OrderService } from 'src/app/core/services/order.service';
import { UserLogged } from 'src/app/core/utils/userlogged';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  public listOrder: Order[] = [];
  public userLogged = new UserLogged();

  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.service.getOrderByQuery(`$filter=UserId eq ${this.userLogged.getCurrentUser().userId}&$expand=Orderdetails($expand=ItemDetail)`).subscribe((data) => {
      this.listOrder = data.value;
      console.log("list order", this.listOrder);
    });
  }
}
