import { Injectable } from '@angular/core';
import { HttpClient, 
		HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private categoryApiUrl 
  	= 'http://5d4a64ff5c331e00148eb14f.mockapi.io/categories';

  getCategoryList(){
  	return this.http.get<any[]>(this.categoryApiUrl);
  }
  removeCategory(cateId){
  	let removeCateUrl = `${this.categoryApiUrl}/${cateId}`;
  	return this.http.delete<any>(removeCateUrl);
  }
  addCategory(data){
    return this.http.post<any>(this.categoryApiUrl, data);
  }
  updateCategory(id, data){
    return this.http.put<any[]>(`${this.categoryApiUrl+"/" + id}`, data);
  }
  getCategoryId(cateId):any{
    let getCateUrl = `${this.categoryApiUrl+"/" + cateId}`;
    return this.http.get<any[]>(getCateUrl);
  }
}
