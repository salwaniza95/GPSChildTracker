import {Component, ViewChild, ElementRef} from '@angular/core';

import {ConferenceData} from '../../providers/conference-data';
import {GlobalService} from '../../providers/global-service';
import {Storage} from '@ionic/storage';
import {Platform} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

declare var google:any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement:ElementRef;
  map:any;
  icons:any = {
    blueDot: 'assets/img/icon-bludot.png',
    babyGirl: 'assets/img/baby-girl.png',
  };
  childPosition:any = {
    address: "",
    coords: {latitude: 0, longitude: 0},
  };
  parentPosition:any = {
    address: "",
    coords: {latitude: 0, longitude: 0},
  };

  constructor(public globalService:GlobalService, public navParams:NavParams, public storage:Storage, public confData:ConferenceData, public platform:Platform) {
    this.storage.get('childPosition').then((data:any)=> {
      if (data) {
        this.childPosition = data;
        this.mapping(this.childPosition);
        this.globalService.toast(this.childPosition.coords.latitude + "," + this.childPosition.coords.longitude).present();
      }
    }, (rejected:any)=> {
      this.currentParentPosition();
    });

  }

  ionViewDidLoad() {

  }

  currentParentPosition() {
    Geolocation.getCurrentPosition().then((position) => {
        this.parentPosition.coords = position.coords;
        // alert("Lat: " + position.coords.latitude + "Lng: " + position.coords.longitude);
        // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //
        // let mapOptions =
        // {
        //   center: latLng,
        //   zoom: 15,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        // };
        //
        // this.mapCanvas = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


        let mapEle = this.mapElement.nativeElement;
        let latLng = new google.maps.LatLng(position.coords.latitude.toString(), position.coords.longitude.toString());

        let map = new google.maps.Map(mapEle, {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>You are here!</h5>`
        });

        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Nama",
          icon: this.icons.blueDot
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      },
      (err) => {
        console.log(err);
      });
  }

  mapping(position:any) {
    let mapEle = this.mapElement.nativeElement;
    let latLng = new google.maps.LatLng(position.coords.latitude.toString(), position.coords.longitude.toString());

    let map = new google.maps.Map(mapEle, {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let infoWindow = new google.maps.InfoWindow({
      content: (position.coords.address) ? position.coords.address : `<h5>You are here!</h5>`
    });

    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "Address",
      icon: this.icons.babyGirl
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  /*
   addMarker() {

   let marker = new google.maps.Marker(
   {
   map: this.map,
   animation: google.maps.Animation.DROP,
   position: this.map.getCenter()
   });

   let content = "<h4>Information!</h4>";

   this.addInfoWindow(marker, content);

   }

   addInfoWindow(marker:any, content:any) {

   let infoWindow = new google.maps.InfoWindow({
   content: content
   });

   google.maps.event.addListener(marker, 'click', () => {
   infoWindow.open(this.map, marker);
   });

   }*/
}
