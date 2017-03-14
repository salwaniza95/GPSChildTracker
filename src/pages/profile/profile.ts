import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public alertCtrl:AlertController)

  {
  nav = nav;
  }

	alert() 
	{
  		let alert = this.alertCtrl .create(
  		{
    		title: 'Successful!',
    		buttons: ['Dismiss']
  		});
  	alert.present();
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



}
