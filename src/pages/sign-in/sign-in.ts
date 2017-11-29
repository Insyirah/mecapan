import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms/";
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { ForgetPasswordPage } from '../forget-password/forget-password';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  form: { username: any; password: any; loginType: string; userType: string; };
  FinalForm: any;
  user: any;
  no: number;
  passwordForm: boolean = false;
  usernameForm: boolean = false;
  planCase: any;
  logInFormname: FormGroup;
  logInFormpassword: FormGroup;
  submitForm: { email: any; phoneNumber: string; userName: string; password: any; type: number; };
  ph: boolean;
  emails: boolean;
  constructor(private storage: Storage, public events: Events, private serviceApi: ServiceApiProvider, private view: ViewController, private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.logInFormname = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
    });
    this.logInFormpassword = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$')])]
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignInPage');
    this.planCase = this.navParams.get("planCase");
    switch (this.planCase) {
      case "userName":
        this.usernameForm = true;
        break
      case "pw":
        this.passwordForm = true;
        break
    }
  }

  test() {
    this.navCtrl.push(ForgetPasswordPage)
  }

  // goSign(){
  //   let myModal = this.modalCtrl.create(SignInPage, {
  //     planCase: "userName"
  //   });
  //   myModal.present();
  // }

  goPassword(x) {
    let myModal = this.modalCtrl.create(SignInPage, {
      name: x.name,
      planCase: "pw"
    });
    myModal.present();
  }

  goSignIn(form) {
    form.name = this.navParams.get("name");
    // this.FinalForm = this.SubmitLogIn(form)
    this.form = {
      username: form.name,
      password: form.password,
      loginType: "Username",
      userType: "Customer"
    }
    console.log("form", this.form)

    this.serviceApi.postLoginMeccapan(this.form).subscribe(data => {
      if (data.status == "success") {
        alert("login success")
        // console.log("ini",data)
        console.log("itu", data)
        this.storage.set("user", data)
        //     this.storage.store("user", data)
        this.events.publish('Login')
        this.navCtrl.push(TabsPage)
      } else if (data.status == "error") {
        console.log(data)
        alert("your detail might be wrong")
        let myModal = this.modalCtrl.create(SignInPage, {
          planCase: "userName"
        });
        myModal.present();
      } else {
        alert("error")
      }
    })
  }



  //   SubmitLogIn(form) {
  //     this.emails = this.emailFilter(form.name)
  //     console.log(this.emails)
  //     if (this.emails == true) {
  //       this.submitForm = {
  //         email: form.name,
  //         phoneNumber: "",
  //         userName: "",
  //         password: form.password,
  //         type: 1
  //       }
  //       console.log(this.submitForm)
  //       //  this.goLogInMeccapan(this.submitForm)
  //     }
  //     else {
  //       this.ph = this.phFilter(form.name)
  //       if (this.ph == true) {
  //         this.submitForm = {
  //           email: "",
  //           phoneNumber: form.name,
  //           userName: "",
  //           password: form.password,
  //           type: 1
  //         }
  //         console.log(this.submitForm)
  //         // this.goLogInMeccapan(this.submitForm)
  //       }

  //       else {
  //         this.submitForm = {
  //           email: "",
  //           phoneNumber: "",
  //           userName: form.name,
  //           password: form.password,
  //           type: 1
  //         }
  //         console.log(this.submitForm)
  //         //   this.goLogInMeccapan(this.submitForm)
  //       }
  //     }
  // return this.submitForm
  //   }




  // emailFilter(x): boolean {
  //   if (x.indexOf("@") == -1) {
  //     return false
  //   }
  //   else {
  //     var res = x.slice(x.indexOf("@") + 1);

  //     if (res.indexOf("@") == -1 && res.indexOf(".") != -1) {
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   }
  // }

  // phFilter(x): boolean {
  //   this.no = parseInt(x)
  //   if (this.no.toString().length == x.length) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

}
