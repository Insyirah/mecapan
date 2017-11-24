import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { ResetPasswordPage } from '../reset-password/reset-password';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  optionType: any;
  forms: { sendTo: any; forgotPasswordByID: number; };
 
  email: any;
  resetPassword: FormGroup;
  items: { name: string; hours: string; price: string; status: number; }[];

  constructor(private serviceApi: ServiceApiProvider,public navCtrl: NavController, public navParams: NavParams,private formBuilder : FormBuilder) {

    this.items = [
      {
        name: 'Treatment 1',
        hours: "30min",
        price: "Rp 50K",
        status:1
      }, {
        name: 'Treatment 2',
        hours: "35min",
        price: "Rp 30K",
        status:2
      }, {
        name: 'Treatment 3',
        hours: "40min",
        price: "Rp 40K",
        status:2
      }, {
        name: 'Treatment 4',
        hours: "37min",
        price: "Rp 60K",
        status:2
      }
    ];

    this.resetPassword = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  chooseOption(option){
    this.optionType = option
    console.log(option)
  }

  getEmail(email){
    this.email = email
    console.log("resetPass",this.email)

    this.forms = {
      sendTo : this.email.email,
      forgotPasswordByID:this.optionType
    }
    console.log("f",this.forms)
    this.serviceApi.getForgotPasswordCode(this.forms).subscribe(data => {
        console.log("data",data)
        if(data.status == "success"){
          alert("Please check email. Forget code has been sent to your email.")
          this.navCtrl.push(ResetPasswordPage,{
            forgotPasswordByID:this.optionType
          })
        }else{
          alert("please try again")
        }
    })
  }
}
