import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {
  treatment: any;

  form: { applicationID: any; };
  applicationId: any;
  appointmentdate: any;
  storename: any;
  bookingDetails: any;
  checkRate: Array<any> = [];
  halfStarIconName: boolean;
  rate: number;

  constructor(private alertCtrl: AlertController, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getBookingDetails()
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  getBookingDetails() {
    this.bookingDetails = this.navParams.get("recentStatusDetail")
    console.log(this.bookingDetails)
    console.log("store", this.bookingDetails.storeName)
    this.storename = this.bookingDetails.storeName
    this.appointmentdate = this.bookingDetails.appointmentDate
    this.treatment = this.bookingDetails.treatmentDetailName
  }


  cancelBooking() {
    this.applicationId = this.bookingDetails.applicationID
    this.form = {
      applicationID: this.applicationId
    }
    this.serviceApi.postCancelBooking(this.form).subscribe(data => {
      console.log(data)
      if (data.status == "success") {
        this.presentAlert('Your appointment has been canceledd');
        this.navCtrl.setRoot(AboutPage)
      } else {
        this.presentAlert('Service Errors');
      }
    })
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
