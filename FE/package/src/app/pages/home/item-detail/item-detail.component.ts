import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, Itemdetail } from 'src/app/core/model/db.model';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-item-detail',
  standalone : false,
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit{
  public idItem : any;
  public listItem : Item[] = [];
  public item : Item = new Item();
  selectedVariant: Itemdetail = new Itemdetail();
  selectedImageUrl: string = '';
  reviews = [
    {
      itemId: 1,
      rating: 5,
      comment: 'Sản phẩm tuyệt vời, đáng mua!',
      user: 'Nguyễn Văn A'
    },
    {
      itemId: 1,
      rating: 4,
      comment: 'Giao hàng nhanh, chất lượng ổn.',
      user: 'Trần Thị B'
    },
    {
      itemId: 2,
      rating: 3,
      comment: 'Tạm ổn trong tầm giá.',
      user: 'Lê C'
    }
  ];
  
  getReviewsByItem(itemId: number) {
    return this.reviews.filter(r => r.itemId === itemId);
  }
constructor(private route: ActivatedRoute,
  private itemService : ItemService
) { this.itemService.getAllItem().subscribe(data => {
  this.listItem = data.value.slice(0, 4); 
}) }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getReviewsByItem(id);
    this.itemService.getItemById(id).subscribe(data => {
      this.item = data.value[0];
      this.selectedVariant = data.value[0].Itemdetails?.[0];
      if(data.value[0].Itemimages?.length > 0) {
        this.selectedImageUrl = data.value[0].Itemimages[0]?.ItemImageUrl;
      }
      console.log(this.item);
    });
   
  }
  selectVariant(detail: any) {
    this.selectedVariant = detail;
    console.log(this.selectedVariant);
    this.selectedImageUrl = detail.ImageUrl || (
      this.item?.Itemimages?.length ? this.item.Itemimages[0].ItemImageUrl : null
    );
  }
  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((c: any) => c.ItemId === product.ItemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
