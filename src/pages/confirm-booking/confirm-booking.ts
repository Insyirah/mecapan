import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { AboutPage } from '../about/about';

/**
 * Generated class for the ConfirmBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-booking',
  templateUrl: 'confirm-booking.html',
})
export class ConfirmBookingPage {
  totalPrice: number;
  storeName: string;
  bookdate: Date;
  form: { applicationID: any; };
  applicationId: any;
  bookings: Array<any>;
  constructor(private alertCtrl: AlertController, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmBookingPage');
    await this.getBookingSummary()
  }

  private presentAlert(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  getBookingSummary() {
    this.bookings = this.navParams.get("detailBooking")
    this.applicationId = this.navParams.get("applicationID")
    console.log("b", this.bookings)

    this.bookdate = this.bookings[0].appointmentDate
    this.storeName = this.bookings[0].storeName
    this.countTotalPrice()
  }

  countTotalPrice() {
    let p = this.bookings.length
    this.totalPrice = 0
    for (let o = 0; o < p; o++) {
      let y = this.bookings[o].treatmentPrice
      this.totalPrice += y
    }
    console.log("total Price",this.totalPrice)
  }

  goBooking() {
    this.form = {
      applicationID: this.applicationId
    }
    console.log(this.form)
    this.serviceApi.postSubmitBooking(this.form).subscribe(data => {
      console.log(data)
      if (data.status == "success") {
        this.presentAlert('You have successfully booking.');
        this.navCtrl.setRoot(AboutPage, {
          applicationID: this.applicationId
        })
      } else {
        this.presentAlert('Service error');
      }
    })
  }
  // this.presentAlert('The email is already in used. Please try another email.');
}
