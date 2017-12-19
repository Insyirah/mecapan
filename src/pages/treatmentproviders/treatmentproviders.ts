import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SetDayAppointmentPage } from '../set-day-appointment/set-day-appointment';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({ selector: 'page-treatmentproviders', templateUrl: 'treatmentproviders.html' })
export class TreatmentprovidersPage {
  dollarCount: any;
  reviewBil: any;
  starRate: any;
  loading: Loading;
  reviewDetail: any;
  banner: any;
  disabledProceed: boolean = true;
  lang: any;
  lat: any;
  endBisnes: any;
  startBisnes: any;
  email: any;
  address: any;
  storeName: any;
  agentBanner: any;
  agentDetail: any;
  agentForm: { agentBranchID: any;  };
  longitude: any;
  latitude: any;
  applicationDetail: any;
  branchId: any;
  discountId: any;
  applicationId: any;
  appID: any;
  brancId: any;
  disId: any;
  bookingDetail: any;
  choosenForm: { treatmentID: any; agentDiscountID: any; agentBranchID: any; };
  submitChoosenTreatment: Array<any> = []
  list2: any;
  list1: any;
  treatmentList: Array<any>;
  form: {};
  list: any;
  checkedItems: boolean[];
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  treatments: any[]
  checked: boolean[]
  constructor(public loadingCtrl: LoadingController,private geolocation: Geolocation, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loading.present();
    this.selectedSegment = 'first';
    this.slides = [
      {
        id: "first",
        title: "First Slide"
      }, {
        id: "second",
        title: "Second Slide"
      }, {
        id: "third",
        title: "Third Slide"
      }
    ];
  }

  HandleImage(data) {
    return this.serviceApi.ImageHandler(data)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TreatmentprovidersPage');
    this.list1 = this.navParams.get("agentId")
    this.list2 = this.navParams.get("treatmentProId")
    this.getListTreatment()
    // this.getCurrentLocation()
    this.postReview()
    this.getAgentDetail()

  }



  getAgentDetail() {
    this.agentForm = {
      agentBranchID: this.list1,
     
    }
    this.serviceApi.getAgentBranchAbout(this.agentForm).subscribe(data => {
      console.log("agent", data)
      this.agentDetail = data.detailList
      this.agentBanner = data.bannerDetail
      this.storeName = this.agentDetail.storeName
      this.banner = this.agentBanner[0].bannerImage
      this.address = this.agentDetail.address
      this.email = this.agentDetail.email
      this.starRate=this.agentDetail.ratingStar
      this.reviewBil= this.agentDetail.reviewCount
      this.startBisnes = this.agentDetail.startBussinessHour
      this.endBisnes = this.agentDetail.endBussinessHour
      this.dollarCount = this.agentDetail.pricingSymbol
      this.lat = this.agentDetail.latitude
      this.lang = this.agentDetail.longitude
      console.log("DS",this.dollarCount)
      console.log("agent", this.agentDetail.storeName)
      console.log("banners", this.agentBanner)
      this.loading.dismiss()
    })
  }

  getListTreatment() {

    console.log("list", this.list)
    this.form = {
      agentBranchID: this.list1,
      treatmentProvidedID: this.list2
    }
    console.log("form", this.form)
    this.serviceApi.getTreatmentList(this.form).subscribe(data => {
      this.treatmentList = data.treatmentList
      this.checkedItems = new Array(this.treatmentList.length);
      console.log("treatmentList", this.treatmentList)
      console.log("checkedItem", this.checkedItems)
    })
  }

  choosenTreatment(treatmentID, status, agentDiscountId, agentBranchId) {
    this.disabledProceed == false ? "" : this.disabledProceed = false;

    this.discountId = agentDiscountId
    this.branchId = agentBranchId
    console.log(agentBranchId)
    if (status == true) {
      this.choosenForm = {
        treatmentID: treatmentID,
        agentDiscountID: agentDiscountId,
        agentBranchID: agentBranchId
      }
      this.submitChoosenTreatment.push(this.choosenForm)
      console.log(this.submitChoosenTreatment)
    } else {
      this.choosenForm = {
        treatmentID: treatmentID,
        agentDiscountID: agentDiscountId,
        agentBranchID: agentBranchId
      }
      this.submitChoosenTreatment = this.submitChoosenTreatment.filter(p => {
        return p.treatmentID != this.choosenForm.treatmentID
      })
      console.log("submit", this.submitChoosenTreatment)
    }
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.slides[slider.getActiveIndex()];
    this.selectedSegment = currentSlide.id;
  }

  bookAppointment() {
    this.form = {
      TreatmentSelectedViewModel: this.submitChoosenTreatment
    }
    console.log("choosen", this.form)
    console.log("Choosentreatment", this.submitChoosenTreatment)
    this.serviceApi.postBookingMain(this.form).subscribe(data => {
      this.bookingDetail = data
      this.applicationId = this.bookingDetail.applicationMainDetail[0].applicationID
      this.applicationDetail = this.bookingDetail.applicationMainDetail
      console.log("bookingDetail", this.bookingDetail)
      console.log("AppID TreatPro", this.applicationId)
      console.log("applicationMainDetail", this.applicationDetail)
      this.navCtrl.push(SetDayAppointmentPage, {
        applicationID: this.applicationId,
        agentDiscountID: this.discountId,
        agentBranchID: this.branchId,
        applicationMainDetail: this.applicationDetail
      })
    })

  }

  postReview() {

    this.form = {
      agentBranchID: this.list1
      // treatmentProvidedID: this.list2
    }
    console.log("form", this.form)
    this.serviceApi.getAgentReview(this.form).subscribe(data => {
      this.reviewDetail = data.detailList//ble data array tu dlm object
      console.log("review", data)
      console.log("Detail Review", this.reviewDetail)
    })
  }


}
