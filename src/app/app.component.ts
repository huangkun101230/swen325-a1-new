import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { Plugins } from "@capacitor/core";

const { SplashScreen, StatusBar } = Plugins;

import * as firebase from 'firebase/app';
import { firebaseConfig } from './credentials'

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide().catch((error) => {
      console.error(error);
    });
    
    firebase.initializeApp(firebaseConfig);

    // StatusBar.hide().catch((error) => {
    //   console.error(error);
    // });
    this.platform.ready().then(() => {});
  }
}
