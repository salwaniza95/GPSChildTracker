import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites:string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public events:Events,
              public storage:Storage) {
  }

  hasFavorite(sessionName:string) {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName:string) {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName:string) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(login:any) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setId(login.id);
    this.setUsername(login.username);
    this.events.publish('user:login');
  };

  signup(username:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  setProfile(profile:any) {
    return Observable.create((observer:any) => {
        this.storage.set("parent_id", profile.parent_id);
        this.storage.set("first_name", profile.first_name);
        this.storage.set("last_name", profile.last_name);
        this.storage.set("gender", profile.gender);
        this.storage.set("age", profile.age);

        observer.next(true);
        observer.complete();
      });
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setId(id:string) {
    this.storage.set('id', id);
  };

  getId() {
    return this.storage.get('id').then((data:any)=>{
      return data;
    });
  };

  setUsername(username:string) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
  };
}
