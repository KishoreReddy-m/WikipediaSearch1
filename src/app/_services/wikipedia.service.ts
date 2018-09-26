import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { WikipediaSearchDataService } from './wikipedia-search-data.service';
import { SearchResult } from '../_models/searchResults';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient, private wikipediaSearchDataService: WikipediaSearchDataService) { }

  searchArticle(_params) {
    const params = new URLSearchParams();
    const wikipediaSearchData = this.wikipediaSearchDataService.getNew(_params); // get the wikipedia data need to pass
    // parse data to query string
    const queryString = Object.keys(wikipediaSearchData.object).map(function (key) {
      return `${key}=${encodeURIComponent(wikipediaSearchData.object[key])}`;
    }).join('&');
    wikipediaSearchData.url = `${wikipediaSearchData.url}${queryString}`;
    return this.http.get<SearchResult>(wikipediaSearchData.url);
  }
}
