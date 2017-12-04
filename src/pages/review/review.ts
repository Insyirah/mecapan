import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  checkRate: Array<any> = [];
  halfStarIconName: boolean;
  rate: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  onModelChange(a) {
    console.log(a)
    let p = this.checkRate.length
    // console.log
    if (this.checkRate[0] != a) {
     // this.checkRate.pop()
      this.checkRate.push(a)
      console.log(this.checkRate)
      

      this.rate = a - 0.5//display
    } else if (this.checkRate[0] == a) {
      this.rate = a
      this.checkRate.pop()
      console.log(this.checkRate)
    }
  }


}
