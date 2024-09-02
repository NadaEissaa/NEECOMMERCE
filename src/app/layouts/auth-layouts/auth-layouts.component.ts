import { FooterComponent } from './../../components/footer/footer.component';
import { Component } from '@angular/core';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layouts',
  standalone: true,
  imports: [NavAuthComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth-layouts.component.html',
  styleUrl: './auth-layouts.component.css'
})
export class AuthLayoutsComponent {

}
