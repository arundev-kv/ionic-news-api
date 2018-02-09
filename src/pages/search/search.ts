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
  pageNo: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsApiService: NewsApiService) {
                this.pageNo = 1;

        
  }

  
  ionViewDidLoad() {
  }

  filterItems(){
      this.newsApiService.getSearchNews(this.searchWord, this.pageNo).
        subscribe((response)=>{
        
          this.searchNews = response.articles;
        }); 
  }
  doInfinite(infiniteScroll){
    this.pageNo=this.pageNo+1;
    this.newsApiService.getSearchNews(this.searchWord, this.pageNo).
    subscribe((response)=>{
    
      this.searchNews = this.searchNews.concat(response.articles); 
      infiniteScroll.complete();
    }); 

  }

}
