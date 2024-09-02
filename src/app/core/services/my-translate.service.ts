import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService = inject(TranslateService);

  constructor() {
    const savedLang = localStorage.getItem('lang');
    this._TranslateService.setDefaultLang('en');
    if (savedLang !== null) {
      this._TranslateService.use(savedLang);
    }
  }

  public changeDirection(): void {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
      document.documentElement.dir = 'ltr';
    } else if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl';
    }
  }

  public changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    this._TranslateService.use(lang);
    this.changeDirection();
  }
}
