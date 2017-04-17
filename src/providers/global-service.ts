import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {LoadingController, AlertController, ToastController, ModalController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

/*
 Generated class for the GlobalService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalService {

  constructor(public http:Http, private alertCtrl:AlertController,
              public toastCtrl:ToastController, public loadingCtrl:LoadingController,
              public modalCtrl:ModalController) {
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
