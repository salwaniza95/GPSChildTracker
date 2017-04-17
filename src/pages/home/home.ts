import {Component} from '@angular/core';
import {NavController, NavParams, Nav, Platform} from 'ionic-angular';

declare var window:any;
/*
 Generated class for the Home page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public smses:any;

  constructor(public navCtrl:NavController, public platform:Platform) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getSMS() {
    if (window.SMS) window.SMS.listSMS({}, (data:any)=> {
      setTimeout(()=> {
        this.smses = data;
      }, 0)

    }, (error:any)=> {
      alert(error);
    });
  }

}
