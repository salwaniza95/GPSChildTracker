import {Component, ViewChild} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {Events, MenuController, Nav, Platform, AlertController} from 'ionic-angular';

import {Splashscreen} from 'ionic-native';
import {Storage} from '@ionic/storage';

import {Observable} from "rxjs/Rx";

import {AboutPage} from '../pages/about/about';
import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {SignupPage} from '../pages/signup/signup';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {SchedulePage} from '../pages/schedule/schedule';
import {SpeakerListPage} from '../pages/speaker-list/speaker-list';
import {SupportPage} from '../pages/support/support';
import {TrackPage} from '../pages/track/track';
import {ProfilePage} from '../pages/profile/profile';

import {ConferenceData} from '../providers/conference-data';
import {UserData} from '../providers/user-data';
import {LocationAccuracy} from 'ionic-native';
import {HomePage} from "../pages/home/home";
import {GlobalService} from "../providers/global-service";

export interface PageInterface {
  title:string;
  component:any;
  icon:string;
  logsOut?:boolean;
  index?:number;
  tabComponent?:any;
}

declare var window:any;

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav:Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages:PageInterface[] = [

    //{title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar'},
    //{title: 'Speakers', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts'},
    {title: 'Map', component: TabsPage, tabComponent: MapPage, index: 0, icon: 'map'},
    {title: 'Track', component: TabsPage, tabComponent: TrackPage, index: 1, icon: 'pin'},
    {title: 'About', component: TabsPage, tabComponent: AboutPage, index: 2, icon: 'information-circle'},
  ];
  loggedInPages:PageInterface[] = [
    {title: 'Account', component: AccountPage, icon: 'person'},
    {title: 'Support', component: SupportPage, icon: 'help'},
    //{title: 'Map', component: MapPage, icon: 'map'},
    {title: 'Profile', component: ProfilePage, icon: 'contact'},
    {title: 'Logout', component: TabsPage, icon: 'log-out', logsOut: true}
  ];
  loggedOutPages:PageInterface[] = [
    {title: 'Login', component: LoginPage, icon: 'log-in'},
    {title: 'Support', component: SupportPage, icon: 'help'},
    {title: 'Signup', component: SignupPage, icon: 'person-add'}
  ];
  rootPage:any;

  constructor(public events:Events, public userData:UserData,
              public menu:MenuController, public platform:Platform,
              public confData:ConferenceData, public storage:Storage,
              public globalService:GlobalService, public alertCtrl:AlertController) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady();
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
  }

  openPage(page:PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn:boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
      this.requestLocationAccuracy();
      this.requestReadSmsPermission().subscribe((data:boolean)=> {
        if (data)
          this.initSmsApp();
      });
    });
  }

  requestLocationAccuracy() {
    LocationAccuracy.canRequest().then((canRequest:boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }

    });
  }

  requestReadSmsPermission() {
    return Observable.create((observer:any)=> {

      var permissions = window.cordova.plugins.permissions;
      permissions.hasPermission(permissions.READ_SMS, (status:any)=> {
        if (!status.hasPermission) {
          var errorCallback = function () {
            alert('READ_SMS permission is not turned on');
            observer.next(false);
            observer.complete();
          };

          permissions.requestPermission(permissions.READ_SMS, (status:any)=> {
            if (!status.hasPermission) {
              errorCallback();
            } else {
              observer.next(true);
              observer.complete();
            }
          }, errorCallback);
        }
      }, null);

    });
  }

  initSmsApp() {
    if (!window.SMS) {
      alert('SMS plugin not ready');
      return;
    }

    if (window.SMS) window.SMS.startWatch(()=> {
      window.document.addEventListener('onSMSArrive', (e:any)=> {
        var sms = e.data;
        // sms.address
        // sms.body
        // alert(JSON.stringify(sms));
        var location = sms.body.split(",");

        var latitude = location[0].trim();
        var longitude = location[1].trim();

        this.globalService.sendLocation(sms.address, latitude, longitude)
          .subscribe((responseData:any)=> {
            responseData = responseData.json();
            // if (this.globalService.inArray(responseData.address, ["+60149823321", "+60195656819", "+601136077678"])) {
              let confirmAlert = this.alertCtrl.create({
                title: "New Location Received",
                message: "Latitude: " + responseData.latitude + "\nLongitude: " + responseData.longitude,
                subTitle: "From: " + responseData.address,
                buttons: [{
                  text: 'Ignore',
                  role: 'cancel'
                }, {
                  text: 'View',
                  handler: () => {
                    //TODO: Your logic here
                    this.nav.setRoot(TabsPage, {position: responseData});
                  }
                }]
              });
              confirmAlert.present();
            // }
          });
      });

    }, (error:any)=> {
      alert('failed to start watching');
    });
  }

  isActive(page:PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
}
