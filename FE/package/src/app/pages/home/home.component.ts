import { Component, OnInit } from '@angular/core';
import { Item, Itemdetail } from 'src/app/core/model/db.model';
import { ItemService } from 'src/app/core/services/item.service';
import { ItemdetailService } from 'src/app/core/services/itemdetail.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public listItem : Itemdetail[] = [];
  constructor(private service : ItemService,
    private serviceItemDetail : ItemdetailService
  ) {}
  ngOnInit(): void {
    this.onGetData();
  }
  products = [
    { name: 'Áo thun DDG', price: 150000, image: 'https://cdn.tgdd.vn/Products/Images/42/329143/iphone-16-pro-tu-nhien-thumb-600x600.jpg' },
    { name: 'Quần jeans DDG', price: 350000, image: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-06-25/3-1561430885-width660height440.jpg' },
    { name: 'Balo mini', price: 250000, image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-black-thumbnew-600x600.jpg' },
    { name: 'Giày thể thao', price: 450000, image: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.landing-big_2x.jpg' },
    { name: 'Áo thun DDG', price: 150000, image: 'https://cdn.tgdd.vn/Products/Images/42/329143/iphone-16-pro-tu-nhien-thumb-600x600.jpg' },
    { name: 'Quần jeans DDG', price: 350000, image: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-06-25/3-1561430885-width660height440.jpg' },
    { name: 'Balo mini', price: 250000, image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-black-thumbnew-600x600.jpg' },
    { name: 'Giày thể thao', price: 450000, image: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-geo-240909-lp.jpg.landing-big_2x.jpg' }
  ];

  vouchers = [
    { title: 'Giảm 10% cho đơn từ 500K', discount: 10, expiry: new Date('2025-05-01') },
    { title: 'Miễn phí vận chuyển toàn quốc', discount: 100, expiry: new Date('2025-04-30') },
    { title: 'Giảm 15% cho khách mới', discount: 15, expiry: new Date('2025-05-15') }
  ];

  onGetData() {
    this.serviceItemDetail.getAllItemdetail().subscribe(data => {
      this.listItem = data.value;
      console.log(this.listItem);
    });
  }
}