import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';

@Component({
  selector: 'app-blank-layouts',
  standalone: true,
  imports: [ RouterOutlet ,NavBlankComponent,FooterComponent],
  templateUrl: './blank-layouts.component.html',
  styleUrl: './blank-layouts.component.css'
})
export class BlankLayoutsComponent {

}
