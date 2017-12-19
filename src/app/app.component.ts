import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { LocalStorageService } from 'ng2-webstorage';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  user: any;
  rootPage: any

  @ViewChild('myNav') nav: NavController
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.storage.get("user").then(data => {
      this.user = data
      if (this.user != null) {
        if (this.user.status == "success") {
          this.rootPage = TabsPage
        }
      } else {
        this.rootPage = StartPage
      }
    })

  }
}
