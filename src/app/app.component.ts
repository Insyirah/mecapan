import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {StartPage} from '../pages/start/start';
import { LocalStorageService } from 'ng2-webstorage';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  user: any;
  rootPage:any
    

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: LocalStorageService) {
    
    this.rootPage = StartPage

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit():void{
    this.user = this.storage.retrieve("user")
    console.log("app",this.user)
    if(this.user!=null){
      if(this.user.status=="success"){
        this.rootPage = TabsPage
      }
    }else {
      this.rootPage = StartPage
  }
  }
}
