import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OtherPage } from '../pages/other/other';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { Museums } from '../pages/museums/museums';
import { artefact } from "../models/artefact";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  public Artefacts:FirebaseListObservable<artefact[]>;

  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform,public data:AngularFireDatabase) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage ,icon:'home' },
      { title: 'Museums', component: Museums,icon:'list-box'},
      { title: 'App info', component: OtherPage,icon:'information-circle' },
      { title: 'Contact Us', component: ContactPage,icon:'call'}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if(this.Artefacts != null){
        this.Artefacts = this.data.list('/Artefacts/');  
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
