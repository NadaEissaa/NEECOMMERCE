import { MyTranslateService } from './../../core/services/my-translate.service';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { last } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {
  private readonly _AuthService = inject(AuthService)
  private readonly _MyTranslateService = inject(MyTranslateService)
  private readonly _TranslateService = inject(TranslateService)
  private readonly _CartService = inject(CartService)

  navCartCount:Signal<number> = computed ( ()=> this._CartService.cartNumber() )

  ngOnInit(): void {
      this._CartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          this._CartService.cartNumber.set(res.numOfCartItems)
        }
      })
  }


  logout():void{
    this._AuthService.logOut();

  }

  change(savedLang:string):void{
    this._MyTranslateService.changeLang(savedLang)

  }
}
