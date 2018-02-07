import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SearchPage } from "../search/search";
import { FavoritesPage } from "../favorites/favorites";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = FavoritesPage;

  constructor() {

  }
}
