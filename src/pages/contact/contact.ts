import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, App, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalStorageService } from 'ng2-webstorage';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { StartPage } from '../start/start';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  testing: Observable<any>;
  @ViewChild(Nav)nav : Nav;
  update: any;
  userId: any;
  profile: FormGroup;
  
  userProfile: any = {}
 
  skin: any[];
  skinTypes: any[];
  form: {};
  user: any = {};

  constructor(public fb: FormBuilder,private app: App,private serviceApi : ServiceApiProvider,private storage: LocalStorageService,public navCtrl: NavController) {
    this.user=this.storage.retrieve("user")
    console.log("user",this.user.listDetail)

    this.profile = fb.group({
      fullName:[''],
      dateOfBirth: [''],
      email: [''],
      gender: [''],
      phoneNumber: ['']
    });

   
  }

  ngOnInit():void{
    this.user=this.storage.retrieve("user")
    this.getSkinType()
    this.getUserProfile()
  }

  getUserProfile(){
    this.serviceApi.getProfile().subscribe(data => {
      // console.log(data.status)
      this.userProfile=data
      this.profile.controls.fullName.setValue(this.userProfile.detail.fullName)
      this.profile.controls.dateOfBirth.setValue(this.userProfile.detail.dateOfBirth)
      this.profile.controls.email.setValue(this.userProfile.detail.email)
      this.profile.controls.gender.setValue(this.userProfile.detail.gender)
      this.profile.controls.phoneNumber.setValue(this.userProfile.detail.phoneNumber)
      console.log("profile",this.userProfile)
      console.log("fullName",this.userProfile.detail.fullName)
    })
  }

  updateDetail(form){
    this.update=this.profile.value
    console.log("update",this.update)
    this.userId = this.userProfile.detail.userID
    console.log("id",this.userId)

    this.form = {
      userID : this.userId,
      fullName:this.update.fullName,
      dateOfBirth:this.update.birthDate,
      email:this.update.email,
      gender:this.update.gender,
      phoneNumber:this.update.phoneNumber
    }

    console.log("updateForm",this.form)
    this.serviceApi.postUpdateDetail(this.form).subscribe(data => {
      console.log(data)
    })

  }

  getSkinType(){
    this.form={
      moduleName : "UserAccount",
      masterName : "List Of Skin Type"
    }
    // this.testing = this.serviceApi.getSkinType(this.form)
    this.serviceApi.getSkinType(this.form).subscribe(data => {
      this.storage.store("skinType",data)
    })
    
  }

  setSkinType(){
    this.skin = this.storage.retrieve("skinType")
    console.log("skin",this.skin)
  }

  logout(){
    this.storage.clear('user');
    this.navCtrl.setRoot(StartPage)
  }

}
