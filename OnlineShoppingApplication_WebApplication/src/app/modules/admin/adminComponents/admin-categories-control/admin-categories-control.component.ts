import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryProductServiceService } from 'src/app/services/admin-category-product-service.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { NewCategoryDetails_Model } from 'src/app/services/models/addNewCategory.model';
import { SelectedCategoryDetails_Model } from 'src/app/services/models/selectedCategory.model';

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
  constructor(private categoryProduct: CategoryProductService, private adminCategoryProduct: AdminCategoryProductServiceService, private formBuilder: FormBuilder) { }

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
        console.log(this.eachCategory);
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          alert("Category unavailable");
        }
        else 
        {
          alert(err.message);
          console.log(err.status);
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

        },
        error(err) {
          if(err.status === 404)
          {
            alert("Category already exists");
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
          console.log(data);
          this.getAllCategories();
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
  }

  deleteCategory(categoryId: string): void{
    if (confirm('Are you sure to delete this Category?')){
      this.adminCategoryProduct.deleteCategory(categoryId).subscribe(
        {         
          next: data => {
            console.log(data);
            this.getAllCategories();
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
    }  
  }
}
