import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { StartPage } from '../start/start';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  optionType: any;
  forms: { forgotPasswordByID: number; forgotPasswordCode: any; recievedFrom: any; newPassword: any; };
  resetPassword: FormGroup;

  constructor(private serviceApi: ServiceApiProvider,private formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.resetPassword = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$')])],
      confirmPassword:['', Validators.required],
      verificationCode:['',Validators.required]
      }, {validator: ResetPasswordPage.MatchPassword});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; 
    if(password != confirmPassword) {
    AC.get('confirmPassword').setErrors( { MatchPassword: true } )
    } else {
      return null
  }
  }

  reset(form){
    console.log("form",form)
    this.optionType = this.navParams.get('forgotPasswordByID')
    this.forms={
      forgotPasswordByID:this.optionType,
      forgotPasswordCode: form.verificationCode,
      recievedFrom: form.email,
      newPassword : form.password,
    }
    console.log("reset",this.forms)
    this.serviceApi.postForgotPassword(this.forms).subscribe(data => {
      console.log(data)
      if(data.status == "success"){
        alert("Your password has been reset")
        this.navCtrl.setRoot(StartPage)
      }else{
        alert("Your code might be wrong.Please try again")
      }
     })
    
  }

}
