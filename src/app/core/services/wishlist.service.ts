import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient)
  myHeaders:any = { token:localStorage.getItem('userToken') }

  constructor() { }
  
  addProductToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` , 
      {
            "productId": id
      }
 
  )
  }

  removeFromWishList(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` ,
      {
        headers: this.myHeaders
      }
    )
  }
  getLoggedUserWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist `,
      {
        headers:this.myHeaders
      }
    )
  }
}
