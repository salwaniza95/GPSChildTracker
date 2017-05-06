import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { GlobalService } from '../../providers/global-service';
import {NgForm} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";
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

  profile:any = {firstname:'', lastname:'', gender:'', age:''};
  submitted = false;

  constructor(public navCtrl:NavController, public navParams:NavParams, public nav:NavController, public alertCtrl:AlertController, public userData: UserData, public globalService:GlobalService) {
  }

  onUpdateProfile (form: NgForm){
    this.submitted = true;

    if (form.valid) {
      this.globalService.updateProfile(this.profile).subscribe((data:any)=>{
        // this.globalService.toast("Profile Updated!").present();
        this.globalService.alert("Success","Profile Updated!").present();
      }, (error:any)=>{

      });
    }
  }

  alert() {
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
