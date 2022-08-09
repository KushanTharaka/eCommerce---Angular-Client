import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryProductServiceService {

  public baseURL: string = "https://localhost:44373/";
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  postNewCategory(newCategoryItemObj: any)
  {
    const token = localStorage.getItem('adminToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.post<any>(`${this.baseURL}`+"api/Category", newCategoryItemObj, {headers});
  }
  
  updateCategory(categoryId: string, name: string)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"updateCategory/" + categoryId + "/" + name, {headers});
  }

  deleteCategory(categoryId: string)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"deleteCategory/" + categoryId, {headers});
  }

  getAllAdminProducts(): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getProductsAdmin");
  }

  getSearchedAdminProducts(searchTerm: string): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getSerachedProductsAdmin/" + searchTerm);
  }

  getAdminCategory(id: string): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getAdminCategoryProducts/" + id);
  }

  postNewProduct(newProductItemObj: any)
  {
    const token = localStorage.getItem('adminToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.post<any>(`${this.baseURL}`+"api/Products", newProductItemObj, {headers});
  }

  deleteProduct(productId: string)
  {
    const token = localStorage.getItem('adminToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"deleteProduct/" + productId, {headers});
  }

  updateProduct(productId: string, updateProductItemObj: any)
  {
    const token = localStorage.getItem('adminToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"api/Products/" + productId, updateProductItemObj, {headers});
  }

  getAllCustomers(): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getAllCustomers");
  }

  getSearchedCustomers(searchTerm: string): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getSearchedCustomers/" + searchTerm);
  }
}
