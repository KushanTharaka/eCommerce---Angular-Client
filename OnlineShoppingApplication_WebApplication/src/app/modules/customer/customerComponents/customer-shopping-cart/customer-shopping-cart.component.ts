import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { UpdateCartItemQty_Model } from 'src/app/services/models/updateCartItemQty.model';

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrls: ['./customer-shopping-cart.component.scss']
})
export class CustomerShoppingCartComponent implements OnInit {

  public cartItemQtyObj  = new UpdateCartItemQty_Model
  public cartForm !: FormGroup;
  constructor(private categoryProduct: CategoryProductService, private formBuilder: FormBuilder) { }

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

  deleteItem(cartId: string, customerId: string, productId: string)
  {
    this.categoryProduct.deleteCartItem(cartId, customerId, productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPrice = 0;
        this.getAllCartProducts();
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
    })
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
    console.log(this.totalPrice);
  }

  getCartItemDetails(each: any)
  {
    //console.log(cartId, customerId, productId, quantity);
    this.cartForm.reset();
    this.cartForm = this.formBuilder.group({
      Qty: [each.quantity]
    });

    this.cartItemQtyObj.ProductName = each.product.name;
    this.cartItemQtyObj.CartID = each.shoppingCartId;
    this.cartItemQtyObj.CustomerID = each.customerId;
    this.cartItemQtyObj.ProductID = each.productId;
    this.cartItemQtyObj.Quantity = each.quantity;

    console.log(this.cartItemQtyObj);

  }

  updateQty(): void
  {
    if(this.cartForm.value.Qty <= 0)
    {
      alert("Quantity is not valid");
    }
    else
    {
      this.categoryProduct.updateCartItemQty(this.cartItemQtyObj.CartID, this.cartItemQtyObj.CustomerID, this.cartItemQtyObj.ProductID, this.cartForm.value.Qty).subscribe(
        {         
          next: data => {
            console.log(data);
            this.getAllCartProducts();
            this.getTotalPrice();
          },
          error(err) {
            if(err.status === 404)
            {
              alert("Item not Found!");
            }
            else 
            {
              alert(err.message);
              console.log(err.status);
            }         
          },
        }
      );

      //console.log(this.cartItemQtyObj.CartID, this.cartItemQtyObj.CustomerID, this.cartItemQtyObj.ProductID, this.cartItemQtyObj.Quantity);

    }
  }

}
