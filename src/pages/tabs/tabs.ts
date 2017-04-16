import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { TrackPage } from "../track/track";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  //tab1Root: any = SchedulePage;
  tab1Root: any = HomePage;
  tab2Root: any = MapPage;
  tab3Root: any = TrackPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
