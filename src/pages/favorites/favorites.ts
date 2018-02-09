import { NewsApiService } from './../../shared/news-api.service';
import { TopNews } from './../../shared/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoriteNews: TopNews[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public newsApiService: NewsApiService) {
    
  }

  ionViewWillEnter() {
    this.favoriteNews = JSON.parse(localStorage.getItem('favoriteNews'));
  }

  remove(clickedFav: TopNews){
    
    this.newsApiService.remove(clickedFav);
   
    this.ionViewWillEnter();
  }



}
