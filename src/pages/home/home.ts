import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private smsVar: SMS, public navParams: NavParams) {

  }
  sendSMS (){
  var options ={
  			replaceLineBreaks: false, 
  			android :{
  				intent:'INTENT'

  			}
  		}
  	this.smsVar.send('0149823321', 'on', options)
      .then(()=> {
        alert("success");
      }, ()=> {
        alert("failed");
      });
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}

