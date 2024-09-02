import { Component, inject, NgModule } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule  , FormsModule ,NgClass ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)
  msgError:string = '';
  isLoading:boolean = false;
  msgSucess:boolean = false;

  email:string = '';
  password:any = '';






  loginForm : FormGroup = new FormGroup({

    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null ,[ Validators.required , Validators.pattern(/^\w{6,}$/) ] ),

 


  } );



  loginSubmit():void{

    if(this.loginForm.valid){
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
          this.msgSucess=true;
          if(res.message == 'success'){
            setTimeout(() => {
              localStorage.setItem('userToken',res.token);

              this._AuthService.saveUserData();


              this._Router.navigate(['/home']);
              
            }, 1000);
   
          

          }

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;

        }

      })
    }

  }



}
