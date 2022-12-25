import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { CartItemDetails_Model } from 'src/app/services/models/cartItem.model';
import { ProductDetails_Model } from 'src/app/services/models/product.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {

  public productForm !: FormGroup;
  public productObj  = new ProductDetails_Model();
  public cartItemObj =  new CartItemDetails_Model();
  constructor(private categoryProduct: CategoryProductService, 
    private formBuilder: FormBuilder, 
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService) { }

  eachProduct: any = [];
  eachCategory: any = [];
  innitialQty: number = 1;

  ngOnInit(): void {
    
    this.getAllProducts();
    this.getAllCategories();

    this.productForm = this.formBuilder.group({
      Qty: [1, Validators.required],
      productId: [''],
      productPrice: []
    });

  }

  getAllProducts(): any
  {
    this.categoryProduct.getAllProducts().subscribe({
      next: (data: any) => {
        this.eachProduct = data;
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Products unavailable!',
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

  getAllCategories(): any
  {
    this.categoryProduct.getAllCategories().subscribe({
      next: (data: any) => {
        this.eachCategory = data;
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Category unavailable!',
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

  getCategoryProducts(id: string): any 
  {
    this.categoryProduct.getCategory(id).subscribe({
      next: (data: any) => {
        this.eachProduct = data;
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Products unavailable!',
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

  openProduct(each: any){ 

    this.productForm.reset();
    this.productForm = this.formBuilder.group({
      Qty: [1, Validators.required],
      productId: [each.productId],
      productPrice: [each.price]
    });
    this.productObj.productId = each.productId;
    this.productObj.categoryId = each.categoryId;
    this.productObj.name = each.name;
    this.productObj.images = each.images;
    this.productObj.details = each.details;
    this.productObj.price = each.price;
    this.productObj.quantity = each.quantity;  
  }

  onSubmit(): void{

    if(this.productForm.value.Qty <= 0)
    {
      this.toastr.warning('Quantity is not valid!', 'Check');
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'error',
      //   title: 'Quantity is not valid!',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
    }
    else
    {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('customerToken')!);

      this.cartItemObj.CustomerID = token.CustomerId;
      this.cartItemObj.ProductID = this.productForm.value.productId;
      this.cartItemObj.Price = this.productForm.value.productPrice;
      this.cartItemObj.Quantity = this.productForm.value.Qty;

      this.categoryProduct.postCartItem(this.cartItemObj).subscribe(
        {         
          next: data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: this.productObj.name + ' Added to Cart',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error(err) {
            if(err.status === 404)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Item already exists!',
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

  searchProducts(searchTerm: string){
    if(searchTerm.length == 0)
    {
      this.getAllProducts();
    }
    else 
    {
      this.categoryProduct.getSearchedProducts(searchTerm).subscribe({
        next: (data: any) => {
          this.eachProduct = data;
        },
        error(err: { status: number; message: any; }) {
          if(err.status === 404)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'info',
              title: 'Products unavailable!',
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

}
