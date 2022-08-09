import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CategoryProductService } from 'src/app/services/category-product.service';

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.scss']
})
export class CustomerCheckoutComponent implements OnInit {

  public billingForm !: FormGroup;

  constructor(private categoryProduct: CategoryProductService, 
    private formBuilder: FormBuilder, 
    private jwtHelper: JwtHelperService, 
    private router: Router) { }

  eachCartProduct: any = [];
  totalPrice: number = 0;

  ngOnInit(): void {

    this.getAllCartProducts();
    const token = this.jwtHelper.decodeToken(localStorage.getItem('customerToken')!);

    this.billingForm = this.formBuilder.group({
      fName: [token.FirstName, Validators.required],
      lName: [token.LastName, Validators.required],
      // Uname: ['', Validators.required],
      email: [token.Email, Validators.compose([Validators.required,Validators.email])],
      address: [token.Address, Validators.required],
      zipCode: [token.PostalCode, Validators.required],
      cardName: [''],
      cardNumber: [''],
      cardExp: [''],
      cardCvv: ['']
      
  });

  }

  getAllCartProducts(): any
  {
    this.categoryProduct.getAllCartItems().subscribe({
      next: (data: any) => {
        this.eachCartProduct = data;
        this.getTotalPrice();
        if(this.eachCartProduct.length <= 0)
        {
          this.router.navigate(['customer/customerShoppingCart']);
        }

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

  onSubmit(){

      const token = this.jwtHelper.decodeToken(localStorage.getItem('customerToken')!);    
      this.categoryProduct.purchaseCartItems(token.CustomerId).subscribe(
        {         
          next: data => {
            console.log(data);
            this.router.navigate(['customer/customerPurchaseHistory']);
            alert("Items Purchased Succesfully!")
          },
          error(err) {
            if(err.status === 404)
            {
              alert("Items not Found!");
            }
            else 
            {
              alert(err.message);
              console.log(err.status);
            }         
          },
        }
      );
  }

}
