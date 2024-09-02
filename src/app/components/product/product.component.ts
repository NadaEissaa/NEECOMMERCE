import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SearchPipe , CurrencyPipe , FormsModule,RouterLink ,NgClass,TranslateModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private readonly _ProductService = inject(ProductService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  allProduct:Iproduct[] = []
  SearchName:string = ''
  isInWishlist: Set<string> = new Set();

  ngOnInit(): void {
      this._ProductService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.allProduct = res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  addToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.set(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addToWishlist(id: string) {
    if (this.isInWishlist.has(id)) {
      this._WishlistService.removeFromWishList(id).subscribe({
        next: (res) => {
          this.isInWishlist.delete(id);
          this._ToastrService.success('Removed from wishlist');
        }
      });
    } else {
      this._WishlistService.addProductToWishList(id).subscribe({
        next: (res) => {
          this.isInWishlist.add(id);
          this._ToastrService.success('Added to wishlist');
        }
      });
    }
  }


}
