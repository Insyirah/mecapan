import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SignInPage } from '../sign-in/sign-in';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { SetDayAppointmentPage } from '../set-day-appointment/set-day-appointment';
import { ListprovidersPage } from "../listproviders/listproviders";


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {
  userData: { email: any; name: any; uId: any; type: number; };

  constructor(private serviceApi: ServiceApiProvider, private googlePlus: GooglePlus, private fb: Facebook, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  goRegister() {
    this.navCtrl.push(RegisterPage)
  }

  SignInStandBy(provider) {
    console.log(provider)
    this.platform.ready().then(x => {
      alert("ready")
      if (provider == "GOOGLE") {
        alert("GOOGLE")
        //this.loginGoogle({ email: "syafiq11a@gmail.com", name: "Syafiq", type: 2, uId: "1911575182192242" })

        this.SignInGoogle()
      }
      else if (provider == "FACEBOOK") {
        alert("FACEBOOK")
        //this.loginFB({ email: "syafiq11a@gmail.com", name: "Syafiq", type: 3, uId: "1911575182192242" })
        this.SignInFacebook()
      }
    })

  }

  SignInGoogle() {
    this.googlePlus.login({}).then(y => {
      this.userData = { email: y.email, name: y.displayName, uId: y.userId, type: 2 }
      console.log(y)
      this.loginGoogle(this.userData)
      this.navCtrl.setRoot(TabsPage)
    }).catch((c) => {
      console.log(c)
      alert("error")
    })
  }


  loginGoogle(form) {
    // this.loginService.postLoginGoogle(form).subscribe(x => {
    //   if (x != null) {
    //     console.log("loginGoogle Success", x)
    //     this.navCtrl.setRoot(HomePage)
    //   }
    //   else {
    //     alert("error")
    //   }
    // })
  }


  SignInFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res.authResponse)
        alert("success")
        if (res.status == "connected") {
          this.fb.api('me?fields=id,email,first_name', []).then(profile => {
            this.userData = { email: profile['email'], name: profile['first_name'], uId: res.authResponse.userID, type: 3 }
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
    // this.loginService.postLoginFacebook(form).subscribe(x => {
    //   if (x != null) {
    //     console.log("loginFb Success", x)
    //     this.navCtrl.setRoot(HomePage)
    //   }
    //   else {
    //     alert("error")
    //   }
    // })
  }


  goSignIn() {
      let myModal = this.modalCtrl.create(SignInPage, {
        planCase: "userName"
      });
      myModal.present();
      this.navCtrl.setRoot(SignInPage)
  //  }
  }

}
