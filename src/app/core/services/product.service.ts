import { environment } from './environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private readonly _HttpClient = inject(HttpClient)

    getAllProducts():Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
    }

    getSepecificProducts(id:string | null):Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
    }
}
