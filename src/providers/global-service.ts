import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {LoadingController, AlertController, ToastController, ModalController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {UserData} from "./user-data";

/*
 Generated class for the GlobalService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalService {

  constructor(public http:Http, private alertCtrl:AlertController,
              public toastCtrl:ToastController, public loadingCtrl:LoadingController,
              public modalCtrl:ModalController, public userData:UserData) {
  }

  toast(message:string, duration:number = 4000, position:string = 'bottom', showCloseButton:boolean = true, closeButtonText:string = 'Ok') {
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText
    });
  }

  loading(content:string) {
    return this.loadingCtrl.create({
      content: content,
      // duration: duration,
      dismissOnPageChange: true
    });
  }

  alert(title:string, subTitle:string, message?:string, buttons:any = ['Ok']) {
    return this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: buttons
    });
  }

  modal(component:any, params:any) {
    return this.modalCtrl.create(component, params);
  }

  signup(signup:any){
    // console.log(login);
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        username: signup.username,
        password: signup.password,
        email: "wawa@email.com",
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://childtracker.cryptical.tech/register.php", requestData/*, options*/)
        .subscribe((responseData:any) => {
          console.log(responseData);
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }

  login(login:any){
    // console.log(login);
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        username: login.username,
        password: login.password,
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://childtracker.cryptical.tech/login.php", requestData/*, options*/)
        .subscribe((responseData:any) => {
          console.log(responseData);
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }

  updateProfile(profile:any){
    // console.log(profile);
    return Observable.create((observer:any) => {
      this.userData.getId().then((parentId:any)=>{
        // At this point make a request to your backend to make a real check!
        var requestData = ({
          parent_id: parentId,
          first_name: profile.firstname,
          last_name: profile.lastname,
          gender: profile.gender,
          age: profile.age,
          birthday: profile.birthday,
        });
        // let headers = new Headers({'Content-Type': 'application/json'});
        // let options = new RequestOptions({headers: headers});
        this.http.post("https://childtracker.cryptical.tech/update_profile.php", requestData/*, options*/)
          .subscribe((responseData:any) => {
            console.log(responseData);
            observer.next(responseData.json());
            observer.complete();
          }, (error:any) => {
            observer.next(error);
            observer.complete();
            console.log(error);
          });
      });

    });
  }

  sendLocation(address:any, latitude:any, longitude:any) {
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        address: address,
        latitude: latitude,
        longitude: longitude,
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://childtracker.cryptical.tech/log_listener.php", requestData/*, options*/)
        .subscribe((responseData:any) => {
          console.log(responseData);
          observer.next(responseData);
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });

  }

  inArray(needle:any, haystack:any) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

}
