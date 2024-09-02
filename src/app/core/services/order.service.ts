import { provideClientHydration } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient : HttpClient ) { }
  

  myHeaders:any = { token : localStorage.getItem('userToken') }

   CheckOUt(id:string | null , formData:object):Observable<any>{
     return  this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        "shippingAddress": formData

          
      }
      ,{
        headers: this.myHeaders
      }
     )
   }
}
