import {Component} from '@angular/core';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {LocationAccuracy} from 'ionic-native';
import {SMS} from 'ionic-native';
import {GlobalService} from '../../providers/global-service';
import {Storage} from '@ionic/storage';

/*
 Generated class for the Track page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var window:any;

@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage {

  constructor(public navCtrl:NavController, public storage:Storage, public navParams:NavParams, public globalService:GlobalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  sendSMS() {
    var options = {
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    };

    /*SMS.send('0149823321', 'on', options)
     .then(()=> {
     alert("success");
     }, ()=> {
     alert("failed");
     });*/

    if (window.SMS) window.SMS.sendSMS("+60149823321", "on", ()=> {
      this.storage.set('childPosition', null).then((data:any)=> {
        alert("Message sent!");
        var t:Tabs = this.navCtrl.parent;
        t.select(2);
      })

    }, ()=> {
      alert("failed");
    });
  }

  receiveSMS() {
    alert("ni dah tak pakai, Sape suh tekan, .. hahahaha");
    /*var address = "+601136077678";
     var latitude = "1.848371";
     var longitude = "103.075292";

     this.globalService.sendLocation(address, latitude, longitude)
     .subscribe((responseData:any)=> {

     });*/
  }

}
