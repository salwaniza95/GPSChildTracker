import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';

import {AboutPage} from '../about/about';
import {MapPage} from '../map/map';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {TrackPage} from "../track/track";
import {GuidelinePage} from "../guideline/guideline";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  position:any;
  tab1Root:any = GuidelinePage;
  tab2Root:any = TrackPage;
  tab3Root:any = MapPage;
  
  // tab4Root:any = AboutPage;
  mySelectedIndex:number;

  constructor(navParams:NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    // this.position = navParams.data.position;
  }

}
