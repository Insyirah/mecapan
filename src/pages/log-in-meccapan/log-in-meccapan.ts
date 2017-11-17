import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../service/login.service";

/**
 * Generated class for the LogInMeccapanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-log-in-meccapan',
  templateUrl: 'log-in-meccapan.html',
})
export class LogInMeccapanPage {
  no: number;
  submitForm: { email: any; phoneNumber: string; userName: string; password: any; type: number; };
  ph: boolean;
  emails: boolean;
  logInForm: FormGroup;
  test: string = "syafiq@gm@ail.co@m"
  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {

    this.logInForm = this.fb.group({
      name: [''],
      password: ['', Validators.required]
    });
  }
  SubmitLogIn(form) {
    this.emails = this.emailFilter(form.name)
    console.log(this.emails)
    if (this.emails == true) {
      this.submitForm = {
        email: form.name,
        phoneNumber: "",
        userName: "",
        password: form.password,
        type: 1
      }
      console.log(this.submitForm)
        this.goLogInMeccapan(this.submitForm)
    }
    else {
      this.ph = this.phFilter(form.name)

      if (this.ph == true) {
        this.submitForm = {
          email: "",
          phoneNumber: form.name,
          userName: "",
          password: form.password,
          type: 1
        }
        console.log(this.submitForm)
        this.goLogInMeccapan(this.submitForm)
      }

      else {
        this.submitForm = {
          email: "",
          phoneNumber: "",
          userName: form.name,
          password: form.password,
          type: 1
        }
        console.log(this.submitForm)
        this.goLogInMeccapan(this.submitForm)
      }
    }

    //this.test = form.name.length

    //this.test.substr(form.name.length - 4, form.name.length);

    // if(form.name){

    // }else if(){

    // }else{

    // }
    // this.loginService.
    // alert()
  }
  ionViewDidLoad() {

    var pol = "syafiq@SVGFEColorMatrixElement.com"
    console.log(pol.slice(pol.length - 4, pol.length))
  }

  goLogInMeccapan(form) {
    this.loginService.postLoginMeccapan(form).subscribe(x => {
      alert("succes")
    })
  }

  emailFilter(x): boolean {
    if (x.indexOf("@") == -1) {

      return false
    }
    else {
      var res = x.slice(x.indexOf("@") + 1);
     
      if (res.indexOf("@") == -1 && res.indexOf(".") != -1) {
        return true
      }
      else {
        return false
      }
    }
  }

  phFilter(x): boolean {
    this.no = parseInt(x)
    if (this.no.toString().length == x.length) {
      return true
    }
    else {
      return false
    }
  }

}
