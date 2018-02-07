import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs';

@Injectable()
export class NewsApiService {

    private baseUrl = 'https://newsapi.org/v2/'
    private allNewsUrl = 'everything?';
    private topNewsUrl = 'top-headlines?';
    private apiKey = 'apiKey=bde85426c0fe4b688d58e6c8d868f97f';

    constructor(private http: Http){

    }

    getSearchNews(searchedWord: string): Observable<any>{
        return this.http.get(`${this.baseUrl}${this.allNewsUrl}q=${searchedWord}&${this.apiKey}`)
        .map((response: Response)=>{
            console.log(response.json());
            return response.json();
        });
    }

    getTopNews(country: string, category: string): Observable<any>{
        return this.http.get(`${this.baseUrl}${this.topNewsUrl}country=${country}&category=${category}&${this.apiKey}`)
        .map((response: Response)=>{
            return response.json();
        });
    }

    
}