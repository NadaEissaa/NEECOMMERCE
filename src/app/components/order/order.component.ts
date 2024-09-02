import { NgClass } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule , NgClass ,ReactiveFormsModule,TranslateModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrderService = inject(OrderService)

  details:string = ''
  phone!:number  
  city:string = ''
  cartId:string | null = ''


  Orders : FormGroup = new FormGroup({
    details : new FormControl( null,[Validators.required] ),
    phone : new FormControl (null ,[Validators.required]),
    city : new FormControl(null ,[Validators.required])
  })


  orderSubmit():void{
    console.log(this.Orders.value)
    this._OrderService.CheckOUt(this.cartId ,  this.Orders.value).subscribe({
      next:(res)=>{
        console.log(res)
        if( res.status === 'success'){

          window.open( res.session.url , '_self' )

        }

      },
      error:(err)=>{
        console.log(err)

      }
    })
  
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id')
        console.log(this.cartId)

      },
      error:(err)=>{
        console.log(err)

      }

    })
      
  }


}
