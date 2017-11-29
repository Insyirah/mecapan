import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Tabs } from "ionic-angular/navigation/nav-interfaces";
import { Events, NavController } from "ionic-angular";
import { StartPage } from "../start/start";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  badgeCount: number;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, public events: Events) {
    this.events.subscribe("LogOut", () => {
      this.navCtrl.setRoot(StartPage)
      this.navCtrl.popToRoot()
    })
    this.getBagdeCountBookingTabs()
  }

  getBagdeCountBookingTabs() {
    //call api
    this.badgeCount = 3
  }

 
}
