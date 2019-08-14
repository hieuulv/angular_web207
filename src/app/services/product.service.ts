import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private categoryApiUrl = 'http://5d4a64ff5c331e00148eb14f.mockapi.io/categories';  // URL to web api

  getListProduct(cateId){
  	return this.http.get<any[]>(`${this.categoryApiUrl+"/" + cateId + "/products"}`)
  }

  removeProduct(cateId, productId){
    return this.http.delete<any>(`${this.categoryApiUrl+"/" + cateId + "/products/" + productId}`);
  }

  addProduct(cateId, data){
  	return this.http.post<any[]>(`${this.categoryApiUrl+"/" + cateId + "/products"}`, data);
  }

  getProductId(cateId, productId):any{
    let getProductUrl = `${this.categoryApiUrl+"/" + cateId + "/products/" + productId}`;
    return this.http.get<any[]>(getProductUrl);
  }

  updateProduct(cateId, productId, data){
    let getProductUrl = `${this.categoryApiUrl+"/" + cateId + "/products/" + productId}`;
    return this.http.put<any[]>(getProductUrl, data);
  }
  
}