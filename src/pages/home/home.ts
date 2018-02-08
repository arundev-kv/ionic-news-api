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
            
    
    
    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory).
      subscribe((response)=>{
      
      this.topNews = response.articles; 
      console.log(response);


     
    });

    this.countries = COUNTRY_CODES;
    this.categories = CATEGORIES;
    //console.log(this.countries);

    
    
  }

  ionViewDidLoad(){
    
    console.log("Home will enter");
    this.favoriteNews = JSON.parse(localStorage.getItem('favoriteNews'));
    for(let news of this.topNews){
      for(let favNews of this.favoriteNews){
        if(news.url == favNews.url){
          news.favorite = true;
        }
        else{
          news.favorite = false;
        }
      }
    }
  }
  getNewsSelect(){
    this.newsApiService.getTopNews(this.selectedCountry,this.selectedCategory).
    subscribe((response)=>{
    
    this.topNews = response.articles; 
    console.log(" select news  "+this.topNews);
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
    console.log("heart "+selectedNews.favorite+" "+selectedNews.url);
    if(selectedNews.favorite){
      return 'heart'
    }
    else{
      return 'heart-outline'
    }
    
    // const favourite = JSON.parse(localStorage.getItem('favList'));
    // if(favourite==null){
    //   return 'heart-outline'
    // }
    // const index = favourite.findIndex(res=>{
    //   return res.id == id;
    // })
 
    // if(index>=0){
    //   return 'heart'
    // }else{
    //   return 'heart-outline'
    // }
  
  }

 
}
