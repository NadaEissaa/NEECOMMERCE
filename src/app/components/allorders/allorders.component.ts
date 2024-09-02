import { Component, OnInit, inject } from '@angular/core';
import { AllorderService } from '../../core/services/allorder.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { IAllorders } from '../../iallorders';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, CommonModule, FormsModule, RouterLink , TranslateModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  private readonly _AllorderService = inject(AllorderService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  allorders: IAllorders [] | null = null;

  userId: string = localStorage.getItem('cartOwner')!;

  ngOnInit(): void {
    this._AllorderService.GetAllOrders(this.userId).subscribe({
      next: (res) => {
        console.log(res); // Check the structure of res here
        this.allorders = res; // Data assignment
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }
}
