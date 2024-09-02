import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  cartNumber:WritableSignal<number> = signal(0)

  userToken:any = { token :localStorage.getItem('userToken') };

  constructor(private _HttpClient : HttpClient) { }

    addProductToCart(id:string):Observable<any>{
      return  this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` ,
        {
            "productId": id
        }
      );
    }

    getLoggedUserCart():Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` , 
        { 
          headers: this.userToken
        }
      )
    }
    RemoveItemsFormCart(id:string):Observable<any>{
      return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` , 
        { 
          headers: this.userToken
        })
    }

    updateCartQuantity(id:string ,newCount:number):Observable<any>{
      return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, 
        {
           "count": newCount
        }
       
      )

}  

  ClearCart(cartId:string):Observable<any>{

    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:this.userToken
      }
    )
  }
}

