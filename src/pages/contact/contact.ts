import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavController, App, Nav, Events, LoadingController, Loading, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { StartPage } from '../start/start';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from "../../app/app.component";
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
  
})
export class ContactPage implements OnInit {
  @Input() src:string;
  @Input() defaul:string;
  hair: any[];
  detail: any;
  loading: Loading;
  update: any;
  userId: any;
  profile: FormGroup;
  userProfile: any = {}
  skin: any[];
  form: {};
  user: any = {};
  transferImg: string;
  defaultPicture: string;
  cameraData: string;
  default: boolean=true;
  uploadDone: boolean=false;
  lastImage: string = null;
  loader: Loading;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, 
    public events: Events, private appCtrl: App, private facebook: Facebook, 
    private googlePlus: GooglePlus, public fb: FormBuilder, private app: App, 
    private serviceApi: ServiceApiProvider, private storage: Storage,
     private camera: Camera, private file: File, public actionSheetCtrl: ActionSheetController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.createFormGroup()
    this.loading.present()
    this.loader = this.loadingCtrl.create({content: 'Uploading...'});
  }

  createFormGroup() {
    this.profile = this.fb.group({
      userID: ["", Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNo: ['', Validators.required],
      weight: ['', Validators.required],
      skinTypeID: ["", Validators.required],
      hairLengthID: ["", Validators.required]
    });
  }

  changeProfilePicture() {
  }

  ngOnInit() {
    this.storage.get("user").then(data => {
      this.user = data
      this.getSkinType()
      this.getHairType()
      this.getUserProfile()
    })
  }

  getUserProfile() {
    this.serviceApi.getProfile().subscribe(data => {
      console.log("getProfile", data)
      this.userProfile = data
      this.profile.controls.userID.setValue(this.userProfile.detail.userID)
      this.profile.controls.fullName.setValue(this.userProfile.detail.fullName)
      this.profile.controls.dateOfBirth.setValue(this.userProfile.detail.dateOfBirth)
      this.profile.controls.email.setValue(this.userProfile.detail.email)
      this.profile.controls.gender.setValue(this.userProfile.detail.gender)
      this.profile.controls.phoneNo.setValue(this.userProfile.detail.phoneNo)
      this.profile.controls.weight.setValue(this.userProfile.detail.weight)// form ni x de lagi
      this.profile.controls.skinTypeID.setValue(this.userProfile.detail.skinTypeID)
      this.profile.controls.hairLengthID.setValue(this.userProfile.detail.hairLengthID)
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
    })
  }

  getHairType() {
    this.form = {
      moduleName: "UserAccount",
      masterName: "List Of Hair Length"
    }
    this.serviceApi.getHairType(this.form).subscribe(data => {
      this.hair = data
    })
  }

  // setSkinType(ParameterName) {
  //   this.skin = this.storage.retrieve("skinType")
  //   console.log("skin", this.skin)
  //   console.log("p",ParameterName)
  // }

  updateUserDetail(form) {

    console.log("updateUserDetail", form)
    if (form.valid == false) {    //check dulu data valid x
      alert("Please Complete The Profile")
    } else {
      this.serviceApi.postUpdateUserProfile(form).subscribe(data => {
        console.log("postUpdateUserProfile", data)
      })
      this.update = this.profile.value
      console.log("update", this.update)
      this.userId = this.userProfile.detail.userID
    }
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
    this.storage.clear();
    this.events.publish("LogOut")
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Your Image',
      buttons: [
        {
          text: 'Photo Gallery',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  updateUrl() {
    this.src = this.defaul;
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWitdh: 1000,
      targetHeight: 1000
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      console.log("imagePathCamera", imagePath)
      this.cameraData = imagePath; 
      this.transferImg = 'data:image/jpeg;base64,'+imagePath
      this.default = false;
      this.uploadDone = true;   
      // console.log("imagePathPublic", imagePath)
    }, (err) => {
      
    });
  }

  public save(description) {
    this.loader.present()
    var options = {
      fileKey: "file",
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'description': description }
  };

  this.form={
    requestID: this.detail.requestId,
    imageDescription: description,
    imageFile: this.transferImg
  }

  console.log('this.form', this.form)
 
  // this.postsService.postImageBefore(this.form).subscribe(x => {
  //   console.log("kkkkk",x)
  //   this.loader.dismiss()
  //   this.presentToast("Successfully uploaded image.")
    // this.navCtrl.setRoot(HomePage)
  // }, (err) => {
  //   this.loader.dismiss()
  //   this.presentAlert('Please try again');
  };

  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: 'top'
  //   });
  //     toast.present(); 
  //   }

  
}


