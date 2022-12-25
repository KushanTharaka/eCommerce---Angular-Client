import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminCategoryProductServiceService } from 'src/app/services/admin-category-product-service.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { NewProductDetails_Model } from 'src/app/services/models/addNewProduct.model';
import { updateProductDetails_Model } from 'src/app/services/models/updateProduct.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-products-control',
  templateUrl: './admin-products-control.component.html',
  styleUrls: ['./admin-products-control.component.scss']
})
export class AdminProductsControlComponent implements OnInit {

  public searchForm !: FormGroup;
  public addProductForm !: FormGroup;
  public updateProductForm !: FormGroup;
  public newProductObj  = new NewProductDetails_Model();
  public updateProductObj  = new updateProductDetails_Model();

  constructor(private categoryProduct: CategoryProductService, 
    private adminCategoryProduct: AdminCategoryProductServiceService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  eachProduct: any = [];
  eachCategory: any = [];

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();

    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgLink: ['', Validators.required],
      qty: [1, Validators.required],
      price: [1, Validators.required],
      category: ['', Validators.required]
    });

    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgLink: ['', Validators.required],
      qty: [1, Validators.required],
      price: [1, Validators.required],
      category: ['', Validators.required]
    });

  }

  getAllProducts(): any
  {
    this.adminCategoryProduct.getAllAdminProducts().subscribe({
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

  searchItem(item: any)
  {
    if(item.length == 0)
    {
      this.getAllProducts();
    }
    else 
    {
      this.adminCategoryProduct.getSearchedAdminProducts(item).subscribe({
        next: (data: any) => {
          this.eachProduct = data;
        },
        error(err: { status: number; message: any; }) {
          if(err.status === 404)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Product unavailable!',
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

  getCategoryProducts(id: string): any 
  {
    if(id == "All_Products")
    {
      this.getAllProducts();
    }
    else
    {
      this.adminCategoryProduct.getAdminCategory(id).subscribe({
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
  }

  SearchProduct(){
    console.log(this.searchForm.value)
  }

  clearForm(){
    this.addProductForm.reset();
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgLink: ['', Validators.required],
      qty: [1, Validators.required],
      price: [1, Validators.required],
      category: ['', Validators.required]
    });
  }

  addProduct(){

    this.newProductObj.Name = this.addProductForm.value.name;
    this.newProductObj.Details = this.addProductForm.value.description;
    this.newProductObj.Images = this.addProductForm.value.imgLink;
    this.newProductObj.Quantity = this.addProductForm.value.qty;
    this.newProductObj.Price = this.addProductForm.value.price;
    this.newProductObj.CategoryId = this.addProductForm.value.category;
    this.newProductObj.ProductStatus = "Available";

    this.adminCategoryProduct.postNewProduct(this.newProductObj).subscribe(
      {         
        next: data => {
          this.getAllProducts();
          this.toastr.success('Product ' + this.newProductObj.Name + ' Added', 'Succesfully Added');
          this.addProductForm.reset();        
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

  deleteProduct(productId: string): void{

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

        this.adminCategoryProduct.deleteProduct(productId).subscribe(
          {         
            next: data => {
              this.getAllProducts();

              swalWithBootstrapButtons.fire(
                'Removed!',
                'Product has been Removed.',
                'success'
              )

            },
            error(err) {
              if(err.status === 404)
              {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Product not Found!',
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

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Product is safe :)',
          'error'
        )
      }
    })

    // if (confirm('Are you sure to delete this Product?')){
    //   this.adminCategoryProduct.deleteProduct(productId).subscribe(
    //     {         
    //       next: data => {
    //         this.getAllProducts();
    //       },
    //       error(err) {
    //         if(err.status === 404)
    //         {
    //           Swal.fire({
    //             position: 'top-end',
    //             icon: 'error',
    //             title: 'Item not Found!',
    //             showConfirmButton: false,
    //             timer: 1500
    //           });
    //         }
    //         else 
    //         {
    //           Swal.fire({
    //             position: 'top-end',
    //             icon: 'error',
    //             title: 'Something went wrong!',
    //             showConfirmButton: false,
    //             timer: 1500
    //           });
    //           console.log(err.message);
    //         }         
    //       },
    //     }
    //   );
    // }  
  }

  getItemDetails(each: any)
  {
    this.updateProductForm = this.formBuilder.group({
      name: [each.name, Validators.required],
      description: [each.details, Validators.required],
      imgLink: [each.images, Validators.required],
      qty: [each.quantity, Validators.required],
      price: [each.price, Validators.required],
      category: [each.category.categoryId, Validators.required]
    });

    this.updateProductObj.productId = each.productId;
    this.updateProductObj.Name = each.name;
    this.updateProductObj.Details = each.details;
    this.updateProductObj.Images = each.images;
    this.updateProductObj.Quantity = each.quantity;
    this.updateProductObj.Price = each.price;
    this.updateProductObj.CategoryName = each.category.name;
    this.updateProductObj.CategoryId = each.category.categoryId;
    this.updateProductObj.ProductStatus = each.productStatus;
  }

  updateProduct()
  {
    this.newProductObj.Name = this.updateProductForm.value.name;
    this.newProductObj.Details = this.updateProductForm.value.description;
    this.newProductObj.Images = this.updateProductForm.value.imgLink;
    this.newProductObj.Quantity = this.updateProductForm.value.qty;
    this.newProductObj.Price = this.updateProductForm.value.price;
    this.newProductObj.CategoryId = this.updateProductForm.value.category;
    this.newProductObj.ProductStatus = "Available";

    this.adminCategoryProduct.updateProduct(this.updateProductObj.productId, this.newProductObj).subscribe(
      {         
        next: data => {
          this.getAllProducts();
          this.toastr.success('Product ' + this.newProductObj.Name + ' Updated', 'Succesfully Updated');
          this.updateProductForm.reset();        
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
