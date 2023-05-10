// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BehaviorSubject} from "rxjs";

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  
  // Private properties
  private langIds: any = [];

  currentRtlSubject: BehaviorSubject<boolean>;
  public RTL : boolean;


  constructor(private translate: TranslateService) {
    // add new langIds to the list
    this.translate.addLangs(['en']);
    if(this.getSelectedLanguage() === 'en'){
      this.currentRtlSubject = new BehaviorSubject<boolean>(false);
    }
    else {
      this.currentRtlSubject = new BehaviorSubject<boolean>(true);
    }

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  setLanguage(lang: string) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      if (lang === 'ar'){
        this.currentRtlSubject.next(true);
      }else {
        this.currentRtlSubject.next(false);
      } 
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }
  }

  /**
   * Returns selected language
   */
  getSelectedLanguage(): any {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||
      this.translate.getDefaultLang()
    );
  }
}
