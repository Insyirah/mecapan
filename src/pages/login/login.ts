import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { HomePage } from "../home/home";

import { ServiceApiProvider } from '../../providers/service-api/service-api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData: { email: any; name: any; uId: string; type: number; };

  constructor(private serviceApi: ServiceApiProvider, private fb: Facebook, private platform: Platform, private googlePlus: GooglePlus, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
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
    }).catch(() =>
      alert("error"))
  }

  
  loginGoogle(form) {
    // this.serviceApi.postLoginGoogle(form).subscribe(x => {
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
          })
        }
        else {
          alert("error login FACEBOOK")
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  loginFB(form) {
    // this.serviceApi.postLoginFacebook(form).subscribe(x => {
    //   if (x != null) {
    //     console.log("loginFb Success", x)
    //     this.navCtrl.setRoot(HomePage)
    //   }
    //   else {
    //     alert("error")
    //   }
    // })
  }

  SignOutFacebook() {
    this.fb.logout().then(x => {
      alert("logout")
    })
  }
}
//  picture: profile['picture_large']['data']['url'],