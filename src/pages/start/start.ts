import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SignInPage } from '../sign-in/sign-in';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { SetDayAppointmentPage } from '../set-day-appointment/set-day-appointment';
import { ListprovidersPage } from "../listproviders/listproviders";
import { LocalStorageService } from "ng2-webstorage";


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {
  userData: { email: any; username: any; fullname: any; loginType: string; userType: string; };

  constructor(private events: Events, private storage: LocalStorageService, private serviceApi: ServiceApiProvider, private googlePlus: GooglePlus, private fb: Facebook, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.platform.ready().then(x => { })
  }

  //   ionViewDidLoad() {
  //  //   console.log('ionViewDidLoad StartPage');
  //   }

  goRegister() {
    this.navCtrl.push(RegisterPage)
  }

  SignInStandBy(provider) {
    console.log(provider)
    if (provider == "GOOGLE") {
      this.SignInGoogle()
    }
    else if (provider == "FACEBOOK") {
      this.SignInFacebook()
    }
  }

  SignInGoogle() {
    this.googlePlus.login({}).then(y => {
      this.userData = { email: y.email, username: y.displayName, fullname: y.givenName, loginType: "Google", userType: "Customer" }
      console.log(y)
      this.loginGoogle(this.userData)
      this.navCtrl.setRoot(TabsPage)
    }).catch((c) => {
      console.log(c)
      alert("error")
    })
  }


  loginGoogle(form) {
    this.serviceApi.postLoginGoogle(form).subscribe(data => {
      console.log("login Google Success", data)
      this.storage.store("user", data)
      this.events.publish('Login')
      this.navCtrl.setRoot(TabsPage)
    })
  }


  SignInFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res.authResponse)
        alert("success")
        if (res.status == "connected") {
          this.fb.api('me?fields=id,email,first_name', []).then(profile => {
            this.userData = { email: profile['email'], username: profile['first_name'], fullname: profile['first_name'] + " " + profile['last_name'], loginType: "Facebook", userType: "Customer" }
            console.log(this.userData)
            this.loginFB(this.userData)
            this.navCtrl.setRoot(TabsPage)

          })
        }
        else {
          alert("error login FACEBOOK")
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  loginFB(form) {
    this.serviceApi.postLoginFacebook(form).subscribe(data => {
      console.log("loginFb Success", data)
      this.storage.store("user", data)
      this.events.publish('Login')
      this.navCtrl.setRoot(TabsPage)
    })
  }


  goSignIn() {
    let myModal = this.modalCtrl.create(SignInPage, {
      planCase: "userName"
    });
    myModal.present();

  }

}
