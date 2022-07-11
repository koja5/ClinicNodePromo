import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private http: HttpClient) {}

  getLanguage(language: string) {
    return this.http.get('../assets/languages/' + language + '.json');
  }

  getAllLangs() {
    return this.http.get('./assets/languages/choose-lang.json');
  }

  getUserLocation() {
    return this.http.get(
      'https://api.ipregistry.co/87.116.160.144?key=m8po7r7zc4y1awic'
    );
  }

  setSelectionLanguage(value: string) {
    localStorage.setItem('selectionLanguage', value);
  }

  getSelectionLangauge() {
    if (localStorage.getItem('selectionLanguage')) {
      return localStorage.getItem('selectionLanguage');
    } else {
      return null;
    }
  }

  setLanguage(value: any) {
    localStorage.setItem(
      'language',
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }
}
