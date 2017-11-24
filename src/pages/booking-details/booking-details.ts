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

  form: { applicationID: any; };
  applicationId: any;
  appointmentdate: any;
  storename: any;
  bookingDetails: any;

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

}
