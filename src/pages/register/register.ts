import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { StartPage } from '../start/start';
import { LocalStorageService } from 'ng2-webstorage';
import { ServiceApiProvider } from '../../providers/service-api/service-api';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerFormsfullName: FormGroup;
  registerFormuserName: FormGroup;
  registerFormemail: FormGroup;
  registerFormpassword: FormGroup;
  registerFormcode: FormGroup;
  verifyCode: any;
  form: {};
  fullName: any;
  numberPhone: any;
  userName: any
  email: any
  // submitFormRegister: { phoneNumber: string; fullName: string; email: string; userName: string; password: string; };
  code: boolean = false;
  pw: boolean = false;
  Email: boolean = false;
  username: boolean = false;
  registerFormphoneNumber: FormGroup;
  phoneNo: boolean = true;
  namaPenuh: boolean = false;
  planCase: any;

  constructor(private alertCtrl: AlertController, private serviceApi: ServiceApiProvider, private storage: Storage, private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.registerFormphoneNumber = this.fb.group({
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('([0-9]{10,11})')])],
    });
    this.registerFormsfullName = this.fb.group({
      fullName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \/\']+')])],
    });
    this.registerFormuserName = this.fb.group({
      userName: ['', Validators.required],
    });
    this.registerFormemail = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    });
    this.registerFormpassword = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$')])],
    });
    this.registerFormcode = this.fb.group({
      code: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

    this.planCase = this.navParams.get("planCase");
    switch (this.planCase) {
      case "fullName":
        this.namaPenuh = true;
        this.phoneNo = false
        break
      case "userName":
        this.username = true;
        this.phoneNo = false
        break
      case "email":
        this.Email = true;
        this.phoneNo = false

        break
      case "pw":
        this.pw = true;
        this.phoneNo = false
        break
      case "code":
        this.code = true;
        this.phoneNo = false
        break

    }
  }

  private presentAlert(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  goPhoneNumber(x) {

    console.log(x.phoneNumber)

    this.serviceApi.getCheckPhoneNumber(x.phoneNumber).subscribe(data => {
      console.log(data)
      if (data.checkPhoneNo == 'NotOk') {
        this.presentAlert('This phone number has been used. Please try again');
      } else {
        let myModal = this.modalCtrl.create(RegisterPage, {
          phoneNumber: x.phoneNumber,
          planCase: "fullName",
          vCode: this.verifyCode
        });//ni 
        myModal.present();
      }
    })
  }

  goFullName(x) {
    // this.submitFormRegister = this.navParams.get("submitFormRegister")
    this.numberPhone = this.navParams.get("phoneNumber")
    this.verifyCode = this.navParams.get("vCode")
    let myModal = this.modalCtrl.create(RegisterPage, {
      fullName: x.fullName,
      phoneNumber: this.numberPhone,
      planCase: "userName",
      vCode: this.verifyCode
    });
    myModal.present();
  }

  goUserName(x) {
    this.numberPhone = this.navParams.get("phoneNumber")
    this.fullName = this.navParams.get("fullName")
    this.verifyCode = this.navParams.get("vCode")

    this.serviceApi.getCheckUserName(x.userName).subscribe(data => {
      console.log(data)
      if (data.checkUsername == 'NotOk') {
        this.presentAlert('This userName has been used. Please try again');
      } else {
        let myModal = this.modalCtrl.create(RegisterPage, {
          userName: x.userName,
          phoneNumber: this.numberPhone,
          fullName: this.fullName,
          planCase: "email",
          vCode: this.verifyCode
        });//then this
        myModal.present();
      }
    })

  }

  goEmail(x) {
    console.log("email", x)
    this.numberPhone = this.navParams.get("phoneNumber")
    this.fullName = this.navParams.get("fullName")
    this.userName = this.navParams.get("userName")
    this.verifyCode = this.navParams.get("vCode")

    this.serviceApi.getCheckEmail(x.email).subscribe(data => {
      console.log(data)
      if (data.checkEmail == 'NotOk') {
        this.presentAlert('This email has been used. Please try again');
      } else {
        let myModal = this.modalCtrl.create(RegisterPage, {
          phoneNumber: this.numberPhone,
          fullName: this.fullName,
          userName: this.userName,
          email: x.email,
          planCase: "pw",
          vCode: this.verifyCode
        });
        myModal.present();
      }
    })

    // console.log(x.email)
  }

  goPassword(x) {

    this.numberPhone = this.navParams.get("phoneNumber")
    this.fullName = this.navParams.get("fullName")
    this.userName = this.navParams.get("userName")
    this.email = this.navParams.get("email")
    this.verifyCode = this.navParams.get("vCode")
    console.log("ver", this.verifyCode)
    let myModal = this.modalCtrl.create(RegisterPage, {
      phoneNumber: this.numberPhone,
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: x.password,//
      planCase: "code",

    });
    myModal.present();
    console.log(this.email)
  }

  goRegister(form) {
    form.phoneNumber = this.navParams.get("phoneNumber");
    form.fullName = this.navParams.get("fullName")
    form.userName = this.navParams.get("userName")
    form.email = this.navParams.get("email")
    form.password = this.navParams.get("password")

    this.form = {
      userName: form.userName,
      password: form.password,
      loginType: "Username",
      userType: "Customer",
      phoneNo: form.phoneNumber,
      fullName: form.fullName,
      email: form.email,
      verificationCode: form.code
    }

    console.log("form", this.form)
    this.serviceApi.postRegister(this.form).subscribe(data => {
      console.log("ini", data)
      if (data.status == "error") {
        alert("Your code might be wrong, please try again.")
      } else {
        this.navCtrl.push(StartPage)
        alert("Successfully Registered your account")
      }
    })

  }



}
