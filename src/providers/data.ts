import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
//import { firebase } from '@firebase';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable() 
export class Data {
  private _museums$: any;
  private _db: AngularFireDatabase;
  private _regionsRef: any;
  constructor() {
    //this._db = AngularFireDatabase.list('/');
    this._regionsRef = this._db.list('/Regions');
    this._regionsRef.on('child_added',this.handleData, this);
    this._museums$ = new ReplaySubject();
  }
  get museums() {
    return this._museums$;
  } handleData(snap) {
    try { // Tell our observer we have new data 
      this._museums$.next(snap.val());
    } catch (error) {
      console.log('catching', error);
    }
  }
}
