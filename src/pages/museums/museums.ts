import { Component,NgZone } from '@angular/core';
import {  NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { CouchbaseProvider } from "../../providers/couchbase-provider";
/**
 * Generated class for the Museums page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-museums',
  templateUrl: 'museums.html',
})
export class Museums {
  public museums: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public couchbase: CouchbaseProvider, public zone: NgZone) {
    this.museums = [];
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Museums');
  }
  public ionViewDidEnter() {
    setTimeout(() => {
        this.couchbase.getChangeListener().subscribe(data => {
            for(let i = 0; i < data.length; i++) {
                console.log(data.length);
                if(!data[i].hasOwnProperty("deleted") && data[i].id.indexOf("_design") === -1) {
                    this.couchbase.getDatabase().getDocument(data[i].id).then((result: any) => {
                        if(result.type === "museum") {
                            this.zone.run(() => {
                                this.museums.push(result);
                            });
                        }
                    });
                }
            }
        });
        this.refresh();
    }, 100);
}

  public refresh() {
    this.couchbase.getDatabase().queryView("_design/dev_museums", "items", {}).then((result: any) => {
        this.museums = [];
        for(var i = 0; i < result.rows.length; i++) {
            this.museums.push(result.rows[i].value);
        }
    }, error => {
        console.error("ERROR: " + JSON.stringify(error));
    });
}
}
