import { FavoritesPage } from './../pages/favorites/favorites';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs';
import { TopNews } from "./news";
import { ToastController } from "ionic-angular";
import { of } from "rxjs/observable/of";

@Injectable()
export class NewsApiService {

    private baseUrl = 'https://newsapi.org/v2/'
    private allNewsUrl = 'everything?';
    private topNewsUrl = 'top-headlines?';
    private apiKey = 'apiKey=bde85426c0fe4b688d58e6c8d868f97f';
    favoriteList: TopNews[];

    constructor(private http: Http, private toastCtrl: ToastController){

    }

    getSearchNews(searchedWord: string, pageIndex: number): Observable<any>{
        return this.http.get(`${this.baseUrl}${this.allNewsUrl}q=${searchedWord}&page=${pageIndex}&${this.apiKey}`)
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

    addToFavorite(clickedFavoriteNews: TopNews){
        this.favoriteList = JSON.parse(localStorage.getItem('favoriteNews'));
        if(this.favoriteList == null){
            //clickedFavoriteNews.index = 0;
            this.favoriteList = [clickedFavoriteNews];
            window.localStorage.setItem('favoriteNews', JSON.stringify(this.favoriteList));
            this.showToast("bottom","Added to Favorites");
        }

        else{
            if(this.favoriteList.find(i => i.url == clickedFavoriteNews.url ) == null){
                //clickedFavoriteNews.index = this.favoriteList.length;
                this.favoriteList.push(clickedFavoriteNews);
               // console.log("index of "+this.favoriteList.indexOf(clickedFavoriteNews));
                window.localStorage.setItem('favoriteNews', JSON.stringify(this.favoriteList));
                this.showToast("bottom","Added to Favorites");
            }
        }
    }


    showToast(position: string,send:string) {
        const toast = this.toastCtrl.create({
           message: send,
          position: position,
          duration: 1000
        });
    
        // toast.onDidDismiss(this.dismissHandler);
        toast.present();
      }

      remove(clickedFav: TopNews){
        this.favoriteList = JSON.parse(localStorage.getItem('favoriteNews'));
        let a = this.favoriteList.findIndex(x => x.url==clickedFav.url);
        console.log("index"+a);
        
        this.favoriteList.splice( this.favoriteList.findIndex(x => x.url==clickedFav.url), 1);
        window.localStorage.setItem('favoriteNews', JSON.stringify(this.favoriteList));
        this.showToast("bottom","Removed from Favorites");
      }
      getFavorite(): Observable <TopNews[]>{
          this.favoriteList = JSON.parse(localStorage.getItem('favoriteNews'));
          return of(this.favoriteList);
      }

    
}