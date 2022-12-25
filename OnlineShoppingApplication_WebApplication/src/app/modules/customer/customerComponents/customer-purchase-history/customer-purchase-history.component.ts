import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryProductService } from 'src/app/services/category-product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-purchase-history',
  templateUrl: './customer-purchase-history.component.html',
  styleUrls: ['./customer-purchase-history.component.scss']
})
export class CustomerPurchaseHistoryComponent implements OnInit {

  constructor(private categoryProduct: CategoryProductService,
    private toastr: ToastrService) { }

  eachCartProduct: any = [];

  ngOnInit(): void {

    this.getPurchasedCartItems();
  }

  getPurchasedCartItems(): any
  {
    this.categoryProduct.getPurchasedCartItems().subscribe({
      next: (data: any) => {
        this.eachCartProduct = data;
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Items not Found!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(err.message);
        }
      }
    });
  }

}
