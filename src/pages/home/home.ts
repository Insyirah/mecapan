import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ListprovidersPage } from '../listproviders/listproviders';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  bodyTreatment: Array<any>;
  hairTreatment: Array<any>;
  faceTreatment: Array<any>;

  constructor(private alertCtrl: AlertController,private storage: Storage, public loadingCtrl: LoadingController, private serviceApi: ServiceApiProvider, public navCtrl: NavController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present()
    this.checkData()
    this.getCheckUserReview()
  }

  // ionViewDidLoad() {

  // }

  private presentAlert(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  checkData() {
    this.storage.get("TreatmentMasterData").then(data => {
      let treatmentData = data
      if (treatmentData != null) {
        //call api cek data status
        this.faceTreatment = treatmentData.FaceMasterData
        this.hairTreatment = treatmentData.HairMasterData
        this.bodyTreatment = treatmentData.BodyMasterData
        this.loading.dismiss()
        // console.log("facetreatment", this.faceTreatment)
        // console.log("hairTreatment", this.hairTreatment)
        // console.log("bodyTreatment", this.bodyTreatment)
      } else {
        this.getAllTreatment()
      }
    })
  }

  getCheckUserReview(){
    this.serviceApi.getCheckReview().subscribe(data => {
    console.log("cekReview",data)
    if(data.message=="Need review"){
      this.presentAlert('Go to Complete Page to make review');
    }
    })
  }


  getAllTreatment() {
    this.serviceApi.getTreatmentMasterData().subscribe(data => {
      this.faceTreatment = data.FaceMasterData
      this.hairTreatment = data.HairMasterData
      this.bodyTreatment = data.BodyMasterData
      // console.log("facetreatment", this.faceTreatment)
      // console.log("hairTreatment", this.hairTreatment)
      // console.log("bodyTreatment", this.bodyTreatment)
      this.loading.dismiss()
      // this.storage.store("TreatmentMasterData", data)
      this.storage.set("treatment", data)
    })
  }

  goTreatmentProvider(MasterDataMaintenanceItemID) {
    this.navCtrl.push(ListprovidersPage, {
      treatmentId: MasterDataMaintenanceItemID
    })
  }


}

