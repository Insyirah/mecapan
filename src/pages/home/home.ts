import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
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

  constructor(private storage: Storage, public loadingCtrl: LoadingController, private serviceApi: ServiceApiProvider, public navCtrl: NavController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present()
    this.getAllTreatment()

  }

  ionViewDidLoad() {
    this.checkData()

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


  getAllTreatment() {
    this.serviceApi.getTreatmentMasterData().subscribe(data => {
      this.faceTreatment = data.FaceMasterData
      this.hairTreatment = data.HairMasterData
      this.bodyTreatment = data.BodyMasterData
      console.log("facetreatment", this.faceTreatment)
      console.log("hairTreatment", this.hairTreatment)
      console.log("bodyTreatment", this.bodyTreatment)
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

