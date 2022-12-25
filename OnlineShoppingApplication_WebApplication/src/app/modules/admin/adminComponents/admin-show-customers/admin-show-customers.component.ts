import { Component, OnInit } from '@angular/core';
import { AdminCategoryProductServiceService } from 'src/app/services/admin-category-product-service.service';

@Component({
  selector: 'app-admin-show-customers',
  templateUrl: './admin-show-customers.component.html',
  styleUrls: ['./admin-show-customers.component.scss']
})
export class AdminShowCustomersComponent implements OnInit {

  constructor(private adminCategoryProduct: AdminCategoryProductServiceService) { }

  eachCustomer: any = [];
  eachCartProduct: any = [];

  ngOnInit(): void {
    this.getAllCustomers();

  }

  getAllCustomers(): any
  {
    this.adminCategoryProduct.getAllCustomers().subscribe({
      next: (data: any) => {
        this.eachCustomer = data;
        console.log(this.eachCustomer);
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          alert("Customers unavailable");
        }
        else 
        {
          alert(err.message);
          console.log(err.status);
        }
      }
    });
  }

  searchCustomer(item: any)
  {
    if(item.length == 0)
    {
      this.getAllCustomers();
    }
    else 
    {
      this.adminCategoryProduct.getSearchedCustomers(item).subscribe({
        next: (data: any) => {
          this.eachCustomer = data;
          console.log(this.eachCustomer);
        },
        error(err: { status: number; message: any; }) {
          if(err.status === 404)
          {
            alert("Customers unavailable");
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

  showPurchaseHistory(id: string){
    console.log(id);
    this.adminCategoryProduct.getPurchasedCartItemsOfCustomer(id).subscribe({
      next: (data: any) => {
        this.eachCartProduct = data;
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
