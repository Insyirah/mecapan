import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ListprovidersPage } from '../listproviders/listproviders';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { LocalStorageService } from "ng2-webstorage";
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
  providerId: any;
  form: {};
  treatmentProvidedDetailID: number;
  avatars: any[];
  ava: any[];

  constructor(private Storage: Storage,private storage: LocalStorageService, public loadingCtrl: LoadingController, private serviceApi: ServiceApiProvider, public navCtrl: NavController) {
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
    let treatmentData = this.storage.retrieve("TreatmentMasterData")
    if (treatmentData != null) {
      //call api cek data status
      this.faceTreatment = treatmentData.FaceMasterData
      this.hairTreatment = treatmentData.HairMasterData
      this.bodyTreatment = treatmentData.BodyMasterData
      this.loading.dismiss()
      console.log("facetreatment", this.faceTreatment)
      console.log("hairTreatment", this.hairTreatment)
      console.log("bodyTreatment", this.bodyTreatment)
    } else {
      this.getAllTreatment()
    }

  }


  getAllTreatment() {
    this.serviceApi.getTreatmentMasterData().subscribe(data => {
      console.log(data)
      this.faceTreatment = data.FaceMasterData
      this.hairTreatment = data.HairMasterData
      this.bodyTreatment = data.BodyMasterData
      console.log("facetreatment", this.faceTreatment)
      console.log("hairTreatment", this.hairTreatment)
      console.log("bodyTreatment", this.bodyTreatment)
      this.loading.dismiss()
      // this.storage.store("TreatmentMasterData", data)
      this.Storage.set("TreatmentMasterData",data)
    })
  }

  goTreatmentProvider(MasterDataMaintenanceItemID) {
    this.navCtrl.push(ListprovidersPage, {
      treatmentId: MasterDataMaintenanceItemID
    })
  }


}

