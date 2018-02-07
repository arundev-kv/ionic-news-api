import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsApiService } from "../../shared/news-api.service";
import { TopNews } from "../../shared/news";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchNews: TopNews[];
  searchWord: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsApiService: NewsApiService) {

        
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  filterItems(searchedWord: string){
    console.log(searchedWord);
      this.newsApiService.getSearchNews(searchedWord).
        subscribe((response)=>{
        
          this.searchNews = response.articles; 
          console.log(this.searchNews);
        }); 
  }

}
