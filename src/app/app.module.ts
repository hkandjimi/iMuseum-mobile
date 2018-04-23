import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BeaconProvider } from '../providers/beacon-provider';
import { CouchbaseProvider } from "../providers/couchbase-provider";
//import {KSSwiperModule} from 'angular2-swiper/dist/ks-swiper.module';
import { BrowserModule } from '@angular/platform-browser';
import { CouchbaseLite } from '@ionic-native/couchbase-lite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OtherPage } from '../pages/other/other';
import { MapPage } from '../pages/map/map';
import { ContactPage } from '../pages/contact/contact';
import { TourPage } from '../pages/tour/tour';
import { Museums } from '../pages/museums/museums';

//Firebase setup
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
//core setup
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';


const firebaseConfig = {
    apiKey: "AIzaSyBYKXrgwqsskLcHM7tai4qicE8YrU_pgoI",
    authDomain: "imuseum-a53cd.firebaseapp.com",
    databaseURL: "https://imuseum-a53cd.firebaseio.com",
    projectId: "imuseum-a53cd",
    storageBucket: "",
    messagingSenderId: "6481694176"
  };

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OtherPage,
    HomePage,
    MapPage,
    ContactPage,
    TourPage,
    Museums
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom'}),
      //KSSwiperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OtherPage,
    HomePage,
    MapPage,
    ContactPage,
    TourPage,
    Museums
  ],
  providers: [
    BeaconProvider,
    StatusBar,
    CouchbaseLite,
    CouchbaseProvider,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
