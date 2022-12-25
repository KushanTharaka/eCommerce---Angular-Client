import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminCategoryProductServiceService } from 'src/app/services/admin-category-product-service.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { NewCategoryDetails_Model } from 'src/app/services/models/addNewCategory.model';
import { SelectedCategoryDetails_Model } from 'src/app/services/models/selectedCategory.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-categories-control',
  templateUrl: './admin-categories-control.component.html',
  styleUrls: ['./admin-categories-control.component.scss']
})
export class AdminCategoriesControlComponent implements OnInit {

  public CategoryForm !: FormGroup;
  public updateCategoryForm !: FormGroup;
  public newCategoryObj  = new NewCategoryDetails_Model();
  public selectedCategoryObj = new SelectedCategoryDetails_Model();
  constructor(private categoryProduct: CategoryProductService, 
    private adminCategoryProduct: AdminCategoryProductServiceService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  eachCategory: any = [];

  ngOnInit(): void {
    this.getAllCategories();

    this.CategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });

    this.updateCategoryForm = this.formBuilder.group({
      CatName: ['', Validators.required]
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

  onSubmit(){
    this.newCategoryObj.Name = this.CategoryForm.value.categoryName;
    this.newCategoryObj.CategoryStatus = "Available";

    this.adminCategoryProduct.postNewCategory(this.newCategoryObj).subscribe(
      {         
        next: data => {

          this.getAllCategories();
          this.CategoryForm.reset();
          this.toastr.success('Category ' + this.updateCategoryForm.value.CatName + ' Added', 'Succesfully Added');

        },
        error(err) {
          if(err.status === 404)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Category already exists!',
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

  getCategoryDetails(categoryDetails: any){

    this.updateCategoryForm = this.formBuilder.group({
      CatName: [categoryDetails.name, Validators.required]
    });

    this.selectedCategoryObj.CategoryId = categoryDetails.categoryId;
    this.selectedCategoryObj.Name = categoryDetails.name;
  }

  updateCategory(){
    this.adminCategoryProduct.updateCategory(this.selectedCategoryObj.CategoryId, this.updateCategoryForm.value.CatName).subscribe(
      {         
        next: data => {
          this.getAllCategories();
          this.toastr.success('Category ' + this.updateCategoryForm.value.CatName + ' Updated', 'Succesfully Updated');
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

  deleteCategory(categoryId: string): void{

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

        this.adminCategoryProduct.deleteCategory(categoryId).subscribe(
          {         
            next: data => {
              this.getAllCategories();

              swalWithBootstrapButtons.fire(
                'Removed!',
                'Category has been Removed.',
                'success'
              )

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

    // if (confirm('Are you sure to delete this Category?')){
    //   this.adminCategoryProduct.deleteCategory(categoryId).subscribe(
    //     {         
    //       next: data => {
    //         this.getAllCategories();
    //       },
    //       error(err) {
    //         if(err.status === 404)
    //         {
    //           alert("Item not Found!");
    //         }
    //         else 
    //         {
    //           alert(err.message);
    //           console.log(err.status);
    //         }         
    //       },
    //     }
    //   );
    // }  
  }
}
