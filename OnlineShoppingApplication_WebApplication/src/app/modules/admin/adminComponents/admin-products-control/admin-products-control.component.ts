import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryProductServiceService } from 'src/app/services/admin-category-product-service.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { NewProductDetails_Model } from 'src/app/services/models/addNewProduct.model';
import { updateProductDetails_Model } from 'src/app/services/models/updateProduct.model';

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

  constructor(private categoryProduct: CategoryProductService, private adminCategoryProduct: AdminCategoryProductServiceService, private formBuilder: FormBuilder) { }

  eachProduct: any = [];
  allProducts: any = [];
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
        // this.allProducts = data;
        // this.eachProduct = this.allProducts;
        this.eachProduct = data;
        console.log(this.eachProduct);
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          alert("Products unavailable");
        }
        else 
        {
          alert(err.message);
          console.log(err.status);
        }
      }
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
          console.log(this.eachProduct);
        },
        error(err: { status: number; message: any; }) {
          if(err.status === 404)
          {
            alert("Products unavailable");
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

  getCategoryProducts(id: string): any 
  {
    // console.log(id);
    // let j = this.allProducts.length;
    // for(let i = 0; i < j; i++)
    // {
    //   if(id == this.allProducts[i].category.categoryId)
    //   {
    //     this.eachProduct = this.allProducts[i];
    //   }
    //   else
    //   {
    //     this.eachProduct = this.allProducts;
    //   }
    // }
    
    if(id == "All_Products")
    {
      this.getAllProducts();
    }
    else
    {
      this.adminCategoryProduct.getAdminCategory(id).subscribe({
        next: (data: any) => {
          this.eachProduct = data;
          console.log(this.eachProduct);
        },
        error(err: { status: number; message: any; }) {
          if(err.status === 404)
          {
            alert("Products unavailable");
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
          console.log(data);
          this.getAllProducts();
          alert(this.newProductObj.Name + " Added");
          this.addProductForm.reset();        
        },
        error(err) {
          if(err.status === 404)
          {
            alert("Item already exists");
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

  deleteProduct(productId: string): void{
    if (confirm('Are you sure to delete this Product?')){
      this.adminCategoryProduct.deleteProduct(productId).subscribe(
        {         
          next: data => {
            console.log(data);
            this.getAllProducts();
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

    // console.log(this.updateProductObj);
  }

  updateProduct()
  {
    // console.log("updateProductForm =" + this.updateProductForm.value.category)
    // console.log("updateProductObj =" + this.updateProductObj.CategoryId)

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
          console.log(data);
          this.getAllProducts();
          alert(this.newProductObj.Name + " Updated");
          this.updateProductForm.reset();        
        },
        error(err) {
          if(err.status === 404)
          {
            alert("Item already exists");
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
