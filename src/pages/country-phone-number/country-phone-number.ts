import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the CountryPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country-phone-number',
  templateUrl: 'country-phone-number.html',
})
export class CountryPhoneNumberPage {
  countryCode: any;
  phoneNumDetail: any;

  constructor(private view:ViewController,private alertCtrl: AlertController, private serviceApi: ServiceApiProvider, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryPhoneNumberPage');
    this.getPhoneCode()
  }

  getPhoneCode(){
    this.serviceApi.getPhoneCountryCode().subscribe(data => {
      this.phoneNumDetail = data
      this.countryCode = data.masterData
      console.log("code phone", this.countryCode)
      console.log("phoneNumDetail", this.phoneNumDetail)
    })
  }

  getCode(phoneCode){
    this.view.dismiss(phoneCode)//untk dismiss modal
  }

}
