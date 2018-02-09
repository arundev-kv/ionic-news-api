import { FavoritesPage } from './../favorites/favorites';
import { CATEGORIES } from './../../shared/news-filter.data';
import { Storage } from '@ionic/storage';
import { NewsApiService } from './../../shared/news-api.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { News, TopNews } from "../../shared/news";
import { Country } from "../../shared/country";
import { COUNTRY_CODES } from "../../shared/news-filter.data";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: News[];
  topNews: TopNews[];
  countries: Country[];
  categories: string[];
  selectedCategory: string;
  selectedCountry: string;
  favorite: boolean = null;
  favoriteNews: TopNews[];

  constructor(public navCtrl: NavController,
              public newsApiService: NewsApiService,
              public storage: Storage
              ) {
    this.selectedCategory = 'general';
    this.selectedCountry = 'us';

    this.countries = COUNTRY_CODES;
    this.categories = CATEGORIES;

    
    
  }

  ionViewWillEnter(){

    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory)
    .subscribe((response)=>{
      
      this.topNews = response.articles; 
      this.newsApiService.getFavorite()
      .subscribe((res)=>{
        this.favoriteNews=res;
        if(this.favoriteNews.length > 0){
          this.topNews.forEach(element1 => {
            let flag: number = 0;
            this.favoriteNews.forEach(element2 => {
              if(element1.url == element2.url){
                flag = 1;
              }
               
             });
             if(flag==1){
              element1.favorite = true;
            }
            else{
              element1.favorite = false;
            }
             
           });
        }
        
      }); 
     
    });
  }

  getNewsSelect(){
    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory).
    subscribe((response)=>{
    
    this.topNews = response.articles; 
  });
  }
 
  addFavorite(clickedNews: TopNews){
    if(clickedNews.favorite){
      clickedNews.favorite = false;
      this.newsApiService.remove(clickedNews);
      
    }
    else{
      clickedNews.favorite = true;
      this.newsApiService.addToFavorite(clickedNews);
    }
    
  }


  isFavorite(selectedNews: TopNews){
    if(selectedNews.favorite){
      return 'heart'
    }
    else{
      return 'heart-outline'
    }
   
  
  }

 
}
