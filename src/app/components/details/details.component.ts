import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe , TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit ,OnDestroy {

  private readonly _CartService = inject(CartService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductService = inject(ProductService)
  private readonly _ToastrService = inject(ToastrService)

  getSubscribe! : Subscription
  productDetails: Iproduct | null = null ;
 

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct = p.get('id');
        console.log(p.get('id'))

        this._ProductService.getSepecificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.productDetails = res.data;

          }
          
        })


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
 ngOnDestroy(): void {
     this.getSubscribe?.unsubscribe();
 }
}

