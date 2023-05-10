import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as arLang } from './modules/i18n/vocabs/ar';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { DOCUMENT } from '@angular/common';
import { Inject,ChangeDetectorRef } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef
  ) {
    // register translations
    this.translationService.loadTranslations(
      arLang,
      enLang,
    );
  }

  ngOnInit() {
    this.translationService.currentRtlSubject.subscribe((rtl) => {
      if (!rtl)
      {
        const html = this.document.getElementsByTagName('html')[0];
        html.setAttribute('direction','ltr');
        html.setAttribute('dir','ltr');
      }
      else {
        const html = this.document.getElementsByTagName('html')[0];
        html.setAttribute('direction','rtl');
        html.setAttribute('dir','rtl');
      }
      this.cdr.detectChanges();
    })

    this.modeService.init();
  }
}
