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

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab1BadgeCount : number = 0;
  constructor(public navCtrl: NavController, public events: Events, ) {
    this.events.subscribe("hehe", () => {
      this.navCtrl.setRoot(StartPage)
      this.navCtrl.popToRoot()
    })

    this.getBagdeCountBookingTabs()
    let badgeCount = 3
  }

  getBagdeCountBookingTabs(){
    let badgeCount = 3
  }
}
