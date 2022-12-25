import { HttpClient, HttpResponse , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  public baseURL: string = "https://localhost:44373/";
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getAllProducts(): any
  {
    return this.http.get<any>(`${this.baseURL}`+"api/Products");
    //return this.http.get<any>("https://localhost:44373/api/Products");
  }

  getSearchedProducts(searchTerm: string): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getSerachedProducts/" + searchTerm);
  }

  getAllCategories(): any
  {
    return this.http.get<any>(`${this.baseURL}`+"api/Category");
  }

  getCategory(id: string): any
  {
    return this.http.get<any>(`${this.baseURL}`+"getCategoryProducts/" + id);
  }

  postCartItem(cartItemObj: any)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.post<any>(`${this.baseURL}`+"api/ShoppingCart/", cartItemObj, {headers});
  }

  getAllCartItems(): any
  {
    const token1 = this.jwtHelper.decodeToken(localStorage.getItem('customerToken')!);

    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.get<any>(`${this.baseURL}`+"notPurchasedItems/" + token1.CustomerId, {headers});
  }

  deleteCartItem(cartId: string, customerId: string, productId: string)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.delete<any>(`${this.baseURL}`+"api/ShoppingCart/" + cartId + "/" + customerId + "/" + productId, {headers});
  }

  updateCartItemQty(cartId: string, customerId: string, productId: string, qty: string)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"changeCartItemQuantity/" + cartId + "/" + customerId + "/" + productId + "/" + qty, {headers});
  }

  purchaseCartItems(customerId: string)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.put<any>(`${this.baseURL}`+"changeCartItemStatus/" + customerId,{headers});
  }

  // sendInvoice(customerName: string, address: string, zip: string, total: number)
  // {
  //   const token = localStorage.getItem('customerToken');
  //   let headers = new HttpHeaders()
  //         .set('Authorization', 'Bearer ' + token);  
    
  //   return this.http.post<any>(`${this.baseURL}`+"sendInvoice/" + customerName + "/" + address + "/" + zip + "/" + total, {headers});
  // }

  sendInvoice(invoiceDetailsObj: any)
  {
    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token);  
    
    return this.http.post<any>(`${this.baseURL}`+"sendInvoice/", invoiceDetailsObj, {headers});
  }

  getPurchasedCartItems(): any
  {
    const token1 = this.jwtHelper.decodeToken(localStorage.getItem('customerToken')!);

    const token = localStorage.getItem('customerToken');
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token); 
    
    return this.http.get<any>(`${this.baseURL}`+"purchasedItems/" + token1.CustomerId, {headers});
  }

}
