import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, App, Nav, Events, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalStorageService } from 'ng2-webstorage';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { StartPage } from '../start/start';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from "../../app/app.component";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  loading: Loading;
  update: any;
  userId: any;
  profile: FormGroup;
  userProfile: any = {}
  skin: any[];
  form: {};
  user: any = {};
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public events: Events, private appCtrl: App, private facebook: Facebook, private googlePlus: GooglePlus, public fb: FormBuilder, private app: App, private serviceApi: ServiceApiProvider, private storage: LocalStorageService) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present()
    this.user = this.storage.retrieve("user")
    //console.log("user", this.user.listDetail)
    this.createFormGroup()
  }

  createFormGroup() {
    this.profile = this.fb.group({
      userID: [this.userId],
      fullName: [''],
      dateOfBirth: [''],
      email: [''],
      gender: [''],
      phoneNo: [''],
      weight: [''],
      skinTypeID: [""],
      hairLengthID: [""]
    });
  }

  changeProfilePicture(){
    
  }

  ngOnInit() {
    this.user = this.storage.retrieve("user")
    //apply loading
    this.getSkinType()
    this.getHairType()
    this.getUserProfile()
  }

  getUserProfile() {
    this.serviceApi.getProfile().subscribe(data => {
      console.log(data)
      this.userProfile = data
      this.profile.controls.userID.setValue(this.userProfile.detail.fullName)
      this.profile.controls.fullName.setValue(this.userProfile.detail.fullName)
      this.profile.controls.dateOfBirth.setValue(this.userProfile.detail.dateOfBirth)
      this.profile.controls.email.setValue(this.userProfile.detail.email)
      this.profile.controls.gender.setValue(this.userProfile.detail.gender)
      this.profile.controls.phoneNo.setValue(this.userProfile.detail.phoneNo)
      this.profile.controls.weight.setValue(this.userProfile.detail.weight)// form ni x de lagi
      this.profile.controls.skinTypeID.setValue(this.userProfile.detail.skinTypeID)
      //    this.profile.controls.hairLengthID.setValue(this.userProfile.detail.hairLengthID)
      //  console.log("profile", this.userProfile)
      //  console.log("fullName", this.userProfile.detail.fullName)
      this.loading.dismiss()

    })
  }

  chooseGender(gender) {
    console.log(gender)
  }

  getSkinType() {
    this.form = {
      moduleName: "UserAccount",
      masterName: "List Of Skin Type"
    }
    this.serviceApi.getSkinType(this.form).subscribe(data => {
      this.skin = data
     // this.storage.store("skinType", data)
    })
  }

  getHairType() {
    this.form = {
      moduleName: "UserAccount",
      masterName: "List Of Hair Type"
    }
    this.serviceApi.getHairType(this.form).subscribe(data => {
     // this.storage.store("hairType", data)
      //  console.log(data)
    })
  }

  // setSkinType(ParameterName) {
  //   this.skin = this.storage.retrieve("skinType")
  //   console.log("skin", this.skin)
  //   console.log("p",ParameterName)
  // }

  updateUserDetail(form) {

    console.log("updateForm",form)
    this.serviceApi.postUpdateUserProfile(form).subscribe(data => {
      console.log(data)
    })
     // this.update = this.profile.value
    // console.log("update", this.update)
    // this.userId = this.userProfile.detail.userID
    // console.log("id", this.userId)
  }



  logout() {
    if (this.user.loginType == "Google") {
      this.googlePlus.disconnect()
      this.handleLogOut()
    }
    else if (this.user.loginType == "Facebook") {
      this.facebook.logout()
      this.handleLogOut()
    }
    else {//meccapan
      this.handleLogOut()
    }
  }

  handleLogOut() {
    this.storage.clear('user');
    this.events.publish("hehe")
  }




}


