import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe , RouterLink , TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService= inject(ToastrService)


  wishList:IWishlist = {} as IWishlist

  ngOnInit(): void {
    
      this.loadWishList()
  }

  loadWishList():void{
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:(res)=>{
        console.log(res)

        this.wishList = res
      },

    })


  }

  RemoveFromWishList(id:string){
    this._WishlistService.removeFromWishList(id).subscribe({
      next:(res)=>{
        console.log(res)
       this.loadWishList();

        this.wishList = res
      }

    })
  }
  addToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._WishlistService.removeFromWishList(id).subscribe({
          next:(res)=>{
            console.log(res)
            this.loadWishList()

          }
        })
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.set(res.numOfCartItems)
   
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
 


}
