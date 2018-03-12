import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps,GoogleMapOptions, GoogleMapsEvent} from '@ionic-native/google-maps';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  xLat:any;yLng:any; 
  map: GoogleMap;
  accuracy:any;
  constructor(public navCtrl: NavController,public platform: Platform,public googleMaps:GoogleMaps) {
    // platform.ready().then(() => {
    //         alert("Map loading please wait.....");
    //         this.loadMap();
    //     });
  }

  ionViewDidLoad() {
      this.platform.ready().then(() => {
              //this.Detect();
              this.loadMap();
          });
  }
  //Method to detect the users current location
  Detect() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.xLat = resp.coords.latitude; 
      this.yLng = resp.coords.longitude;
      alert("Location :"+this.xLat+this.yLng);
      this.accuracy = resp.coords.accuracy + ' meters';
    }).catch((error) => {
      alert('Error detecting your location: ' + error);
    });
  }
  loadMap() {
    let mapElement = document.getElementById('map');
    Geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 15,
          tilt: 30
        }
      };

      this.map = this.googleMaps.create(mapElement, mapOptions);

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          // Now you can use all methods safely.
          this.map.addMarker({
            title: 'You are here',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            }
          })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
            });

        });
    }).catch((error) => {
      alert('Error detecting your location: ' + error);
    });
  }
}
