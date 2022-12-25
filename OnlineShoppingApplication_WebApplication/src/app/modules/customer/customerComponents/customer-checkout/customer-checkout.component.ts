import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { InvoiceDetails_Model } from 'src/app/services/models/invoiceDetails.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.scss']
})
export class CustomerCheckoutComponent implements OnInit {

  public billingForm !: FormGroup;
  public invoiceObj = new InvoiceDetails_Model();

  constructor(private categoryProduct: CategoryProductService, 
    private formBuilder: FormBuilder, 
    private jwtHelper: JwtHelperService, 
    private router: Router,
    private toastr: ToastrService) { }

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
            this.sendEmail(token);
            this.router.navigate(['customer/customerPurchaseHistory']);
            this.toastr.success('Items Purchased Succesfully!', 'Thank you');
          },
          error(err) {
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
          },
        }
      );
  }

  sendEmail(token: any){
    let name = token.Title + " " + token.FirstName + " " + token.LastName; 

    this.invoiceObj.Email = token.Email;
    this.invoiceObj.Name = name;
    this.invoiceObj.Address = token.Address;
    this.invoiceObj.ZipCode = token.PostalCode;
    this.invoiceObj.Total = (this.totalPrice+150).toString();

    //this.categoryProduct.sendInvoice(name, token.Address, token.PostalCode, this.totalPrice+150).subscribe();
    this.categoryProduct.sendInvoice(this.invoiceObj).subscribe();
  }

}
