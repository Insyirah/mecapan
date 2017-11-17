import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ListprovidersPage } from '../listproviders/listproviders';
import { ServiceApiProvider } from '../../providers/service-api/service-api';

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

  constructor(public loadingCtrl: LoadingController,private serviceApi: ServiceApiProvider, public navCtrl: NavController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present()
  }

  ionViewDidLoad() {
    this.getAllTreatment()
  }


  getAllTreatment(){
    this.serviceApi.getTreatmentMasterData().subscribe(data => {
      console.log(data)
      this.faceTreatment = data.FaceMasterData
      this.hairTreatment = data.HairMasterData
      this.bodyTreatment = data.BodyMasterData
      console.log("facetreatment",this.faceTreatment)
      console.log("hairTreatment",this.hairTreatment)
      console.log("bodyTreatment",this.bodyTreatment)
      this.loading.dismiss()
    })
  }

  goTreatmentProvider(MasterDataMaintenanceItemID) {
    this.navCtrl.push(ListprovidersPage, {
      treatmentId: MasterDataMaintenanceItemID
    })
  }


}

