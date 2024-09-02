import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AllorderService {

  constructor(private _HttpClient : HttpClient) { }

  GetAllOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
  }
}
