import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import {KSSwiperSlide, KSSwiperContainer} from '../../../node_modules/angular2-swiper/dist/ks-swiper'; 
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { artefact } from "../../models/artefact";
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [KSSwiperSlide, KSSwiperContainer]
})
export class HomePage {
  category: string = 'gear';
  trustedUrl : SafeResourceUrl;
  public Artefacts:FirebaseListObservable<artefact[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,private sanitizer: DomSanitizer,public data:AngularFireDatabase) {
    this.trustedUrl =this.sanitizer.bypassSecurityTrustResourceUrl("http://www.namibian.org/travel/museums/independence-memorial-museum.html");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.Artefacts = this.data.list('/Artefacts/');
  } 


}
