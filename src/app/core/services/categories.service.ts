import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient);

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }

  getSubCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }

}
