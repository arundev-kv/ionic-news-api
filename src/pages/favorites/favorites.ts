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

  favoriteNews: TopNews;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.favoriteNews = navParams.data;
    console.log("fav data "+this.favoriteNews.author);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }



}
