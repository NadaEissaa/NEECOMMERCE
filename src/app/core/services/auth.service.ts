import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject (HttpClient);
  private _Router = inject(Router)
  BaseUrl:string = ''
  userData:any;


  setRegisterForm( data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  setLoginForm( data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }


  SetVerifyEmail( data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  SetVerifyCode( data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }

  SetResetPassword(data:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
} 

saveUserData():void{

    if(localStorage.getItem('userToken')!== null){
      this.userData = jwtDecode(localStorage.getItem('userToken')!)
        
    }

  }

  logOut():void{

    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);



  }

}
