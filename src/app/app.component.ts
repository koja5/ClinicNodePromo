import { Component } from '@angular/core';
import { HelpService } from './help.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public language: any;
  public selectionLanguage: any = 'serbia';
  public chooseLang: any;

  constructor(private helpService: HelpService) {}

  ngOnInit() {
    const selectionLanguage = this.helpService.getSelectionLangauge();
    this.helpService.getAllLangs().subscribe((data) => {
      this.chooseLang = data;
      this.initializationLanguage();
      this.getNameOfFlag(data, selectionLanguage);
      if (!this.selectionLanguage) {
        this.selectionLanguage = selectionLanguage;
      }
    });
  }

  initializationLanguage() {
    if (this.helpService.getSelectionLangauge()) {
      const location = {
        code: this.helpService.getSelectionLangauge(),
      };
      this.setLanguageByLocation(location, this.chooseLang);
    } else {
      this.helpService.getUserLocation().subscribe(
        (data: any) => {
          this.setLanguageByLocation(data.location.country, this.chooseLang);
        },
        (error: any) => {
          this.getLanguageByCode('english', 'EN');
        }
      );
    }
  }

  getNameOfFlag(langs: any, selectionLanguage: any) {
    for (let i = 0; i < langs.length; i++) {
      for (let j = 0; j < langs[i].similarCode.length; j++) {
        if (langs[i].similarCode[j] === selectionLanguage) {
          this.selectionLanguage = langs[i].name;
          break;
        }
      }
    }
  }

  setLanguageByLocation(location: any, langs: any) {
    for (let i = 0; i < langs.length; i++) {
      for (let j = 0; j < langs[i].similarCode.length; j++) {
        if (langs[i].similarCode[j] === location.code) {
          this.getLanguageByCode(langs[i].name, location.code);
          break;
        }
      }
    }
  }

  getLanguageByCode(language: string, code: string) {
    this.helpService.getLanguage(language).subscribe((data) => {
      this.language = data;
      this.helpService.setSelectionLanguage(code);
    });
  }

  changeLanguage(code: string, name: string) {
    this.selectionLanguage = name;
    this.helpService.setSelectionLanguage(code);
    this.helpService.getLanguage(name).subscribe((language) => {
      this.language = language;
    });
  }
}
