import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { UpdateCartItemQty_Model } from 'src/app/services/models/updateCartItemQty.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrls: ['./customer-shopping-cart.component.scss']
})
export class CustomerShoppingCartComponent implements OnInit {

  public cartItemQtyObj  = new UpdateCartItemQty_Model
  public cartForm !: FormGroup;
  constructor(private categoryProduct: CategoryProductService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  eachCartProduct: any = [];
  totalPrice: number = 0;

  ngOnInit(): void {

    this.getAllCartProducts();

    this.cartForm = this.formBuilder.group({
      Qty: []
    });

  }

  getAllCartProducts(): any
  {
    this.categoryProduct.getAllCartItems().subscribe({
      next: (data: any) => {
        this.eachCartProduct = data;
        this.getTotalPrice();
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cart unavailable!',
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

  deleteItem(cartId: string, customerId: string, productId: string)
  {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.categoryProduct.deleteCartItem(cartId, customerId, productId).subscribe({
          next: (data: any) => {
            this.totalPrice = 0;
            this.getAllCartProducts();

            swalWithBootstrapButtons.fire(
              'Removed!',
              'Item has been Removed.',
              'success'
            )

          },
          error(err: { status: number; message: any; }) {
            if(err.status === 404)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Cart unavailable!',
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
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Cart Item is safe :)',
          'error'
        )
      }
    })

    // this.categoryProduct.deleteCartItem(cartId, customerId, productId).subscribe({
    //   next: (data: any) => {
    //     this.totalPrice = 0;
    //     this.getAllCartProducts();
    //   },
    //   error(err: { status: number; message: any; }) {
    //     if(err.status === 404)
    //     {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Cart unavailable!',
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //     }
    //     else 
    //     {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Something went wrong!',
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //       console.log(err.message);
    //     }
    //   }
    // })
  }

  getTotalPrice(): void
  {
    this.totalPrice = 0;
    let j = this.eachCartProduct.length;
    for(let i = 0; i < j; i++)
    {
      let price = this.eachCartProduct[i].price;
      let qty = this.eachCartProduct[i].quantity;
      this.totalPrice = this.totalPrice + (price * qty);
    }
  }

  getCartItemDetails(each: any)
  {
    this.cartForm.reset();
    this.cartForm = this.formBuilder.group({
      Qty: [each.quantity]
    });

    this.cartItemQtyObj.ProductName = each.product.name;
    this.cartItemQtyObj.CartID = each.shoppingCartId;
    this.cartItemQtyObj.CustomerID = each.customerId;
    this.cartItemQtyObj.ProductID = each.productId;
    this.cartItemQtyObj.Quantity = each.quantity;
  }

  updateQty(): void
  {
    if(this.cartForm.value.Qty <= 0)
    {
      this.toastr.warning('Quantity is not valid!', 'Check');
    }
    else
    {
      this.categoryProduct.updateCartItemQty(this.cartItemQtyObj.CartID, this.cartItemQtyObj.CustomerID, this.cartItemQtyObj.ProductID, this.cartForm.value.Qty).subscribe(
        {         
          next: data => {
            this.getAllCartProducts();
            this.getTotalPrice();
          },
          error(err) {
            if(err.status === 404)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Item not Found!',
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
          },
        }
      );
    }
  }

}
