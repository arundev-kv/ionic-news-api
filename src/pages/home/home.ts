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
  constructor(public navCtrl: NavController,
              public newsApiService: NewsApiService,
              public storage: Storage
              ) {
    this.selectedCategory = 'general';
    this.selectedCountry = 'us';
            
    
    storage.get('name').then((val) => {
      console.log('Your age is', val);
    });
  

    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory).
      subscribe((response)=>{
      
      this.topNews = response.articles; 
      console.log(response);


     
    });

    this.countries = COUNTRY_CODES;
    this.categories = CATEGORIES;
    //console.log(this.countries);

    
    
  }
  getNewsSelect(){
    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory).
    subscribe((response)=>{
    
    this.topNews = response.articles; 
    console.log(this.topNews);
  });
  }
 
  addFavorite(favoriteNews: TopNews){
    this.storage.set(favoriteNews.source.id, favoriteNews);
    this.favorite = true;
    this.navCtrl.push(FavoritesPage, favoriteNews);
  }

 
}
