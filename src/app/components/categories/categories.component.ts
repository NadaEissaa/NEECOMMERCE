import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, NgClass, TranslateModule, AsyncPipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryNames$: Observable<{ [key: string]: string }>;
  subcategoryNames$: Observable<{ [key: string]: string }>;
  allCategories: ICategory[] = [];
  Subcategory: ICategory[] = [];
  catName: string = '';

  constructor(private translate: TranslateService, private categoriesService: CategoriesService) {
    // Preload translations for categories and subcategories
    this.categoryNames$ = this.translate.get('CATEGORY_NAMES');
    this.subcategoryNames$ = this.translate.get('SUBCATEGORY_NAMES');
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allCategories = res.data;
      }
    });
  }

  getCategoryName(slug: string): Observable<string> {
    return this.categoryNames$.pipe(
      map(translations => translations[slug.toUpperCase()] || slug)
    );
  }

  getSubCategoryName(slug: string): Observable<string> {
    return this.subcategoryNames$.pipe(
      map(translations => translations[slug.toUpperCase()] || slug)
    );
  }

  getCategoryAltText(): Observable<string> {
    return this.translate.get('CATEGORIES_SECTION.CATEGORY_CARD.DEFAULT_ALT');
  }

  subProduct(id: string, name: string): void {
    this.categoriesService.getSubCategory(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.Subcategory = res.data;
        this.catName = name;
      }
    });
  }

  trackByCategoryId(index: number, category: ICategory): string {
    return category._id;
  }

  trackBySubCategoryId(index: number, subCat: ICategory): string {
    return subCat._id;
  }
}
