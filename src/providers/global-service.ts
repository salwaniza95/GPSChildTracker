import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

/*
 Generated class for the GlobalService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalService {

  constructor(public http:Http) {
  }

  sendLocation(latitude:any, longitude:any) {
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        latitude: latitude,
        longitude: longitude,
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://childtracker.cryptical.tech//log_listener.php", requestData/*, options*/)
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

}
