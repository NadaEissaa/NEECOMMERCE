import { Routes } from '@angular/router';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { BlankLayoutsComponent } from './layouts/blank-layouts/blank-layouts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [


  {
    path: '',
    component: AuthLayoutsComponent,
    canActivate: [logedGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgetPasswordComponent },
    ],
  },

  {
    path: '',
    component: BlankLayoutsComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'brand', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'orders/:id', component: OrderComponent },
    ],
  },


  { path: '**', component: NotfoundComponent },
];
