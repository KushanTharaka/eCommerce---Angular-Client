import { Component, OnInit } from '@angular/core';
import { CategoryProductService } from 'src/app/services/category-product.service';

@Component({
  selector: 'app-customer-purchase-history',
  templateUrl: './customer-purchase-history.component.html',
  styleUrls: ['./customer-purchase-history.component.scss']
})
export class CustomerPurchaseHistoryComponent implements OnInit {

  constructor(private categoryProduct: CategoryProductService) { }

  eachCartProduct: any = [];

  ngOnInit(): void {

    this.getPurchasedCartItems();
  }

  getPurchasedCartItems(): any
  {
    this.categoryProduct.getPurchasedCartItems().subscribe({
      next: (data: any) => {
        this.eachCartProduct = data;
        console.log(this.eachCartProduct);
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          alert("Cart unavailable");
        }
        else 
        {
          alert(err.message);
          console.log(err.status);
        }
      }
    });
  }

}
