// core stuff
import { Component } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { NgZone } from '@angular/core';

// providers
import { BeaconProvider } from '../../providers/beacon-provider';

// models
import { BeaconModel } from "../../models/beacon-module";
import { artefact } from "../../models/artefact";

@Component({
    selector: 'page-tour',
    templateUrl: 'tour.html'
})
export class TourPage {

    beacons: BeaconModel[] = [];
    //POI:artefact[] = [];
    zone: any;

    constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
        // required for UI update
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.beaconProvider.initialise().then((isInitialised) => {
                if (isInitialised) {
                        this.listenToBeaconEvents();
                }
            });
        });
    }

    listenToBeaconEvents() {
        this.events.subscribe('didRangeBeaconsInRegion', (data) => {

            // update the UI with the beacon list
            this.zone.run(() => {

                this.beacons = [];
                //this.POI = [];

                let beaconList = data.beacons;
                beaconList.forEach((beacon) => {
                    let beaconObject = new BeaconModel(beacon);
                    //let artefactObject = new artefact(this.dataFireBase,beaconObject.minor)
                    //this.POI.push(artefactObject);
                    this.beacons.push(beaconObject);
                });

            });

        });
    }

}