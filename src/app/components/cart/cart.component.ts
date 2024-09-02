import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink , TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{


  cartProduct:ICart = { } as ICart
  cartId:string = ''
  cartOwner:string = ''

  private readonly _CartService = inject(CartService)
  ngOnInit(): void {
      this._CartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          console.log(res)
          this.cartProduct = res;
          this.cartId=res.data.cartId
          this.cartOwner=res.data.cartOwner
          localStorage.setItem('cartOwner',this.cartOwner)
          console.log(this.cartOwner)
  
   

        },
        error:(err)=>{
          console.log(err)

        }
      })
      
  }
  RemoveItemsFormCart(id:string){
    this._CartService.RemoveItemsFormCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartProduct = res
        this._CartService.cartNumber.set(res.numOfCartItems)
        
      },
      error:(err)=>{
          console.log(err)
      }
    })
  }
  UpdateCount(id:string ,count:number ){
   if(count > 0){
    this._CartService.updateCartQuantity(id ,count  ).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartProduct = res

      },
      error:(err)=>{
        console.log(err)

      }
    })
   }
   else{
    this.RemoveItemsFormCart(id);
   }
  }
  ClearCart(id:string):void{
    this._CartService.ClearCart(id).subscribe({  next:(res)=>{
      console.log(res)
      this.cartProduct = res
      this._CartService.cartNumber.set(0)

    },
    error:(err)=>{
      console.log(err)

    }

    })

  }


}
