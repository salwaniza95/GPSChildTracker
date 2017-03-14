import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component(
{
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage
{
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  		this.ionViewLoaded();
  }

  ionViewDidLoad()
  {
    this.loadMap();
  }
 
  loadMap()
  {
 
 	Geolocation.getCurrentPosition().then((position) => 
 	{
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = 
      {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, 
    (err) => 
    {
      console.log(err);
    });
 
  }
  addMarker()
  {
 
  	let marker = new google.maps.Marker(
  	{
    	map: this.map,
    	animation: google.maps.Animation.DROP,
    	position: this.map.getCenter()
  	});
 
  	let content = "<h4>Information!</h4>";          
 
  	this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content)
  {
 
  	let infoWindow = new google.maps.InfoWindow(
  	{
    	content: content
  	});
 
  	google.maps.event.addListener(marker, 'click', () => 
  	{
    	infoWindow.open(this.map, marker);
  	});
 
  }

}

