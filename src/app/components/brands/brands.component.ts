import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrand';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService)
  brands:IBrands[] = []
  name:string = ''
  image:string= ''
  slug:string= ''
  showDetails:boolean = false;

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brands = res.data
      }
    })
      
  }

  getDetails(id:string , name : string , image : string , slug : string):void{

     
    this._BrandsService.getSpecificBrandDetails(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        const brand= res.data
     this.name = name
     this.image = image
     this.slug = slug
     this.showDetails= true
  


      }

    })
  }
  close():void{
    this.showDetails= false

  }


}
