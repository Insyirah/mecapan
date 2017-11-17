import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {AboutPage} from '../about/about';
import {SetDayAppointmentPage} from '../set-day-appointment/set-day-appointment';
import {ServiceApiProvider} from '../../providers/service-api/service-api';

@IonicPage()
@Component({selector: 'page-treatmentproviders', templateUrl: 'treatmentproviders.html'})
export class TreatmentprovidersPage {
  applicationDetail: any;
  branchId: any;
  discountId: any;
  applicationId: any;
  appID: any;
  brancId: any;
  disId: any;
  bookingDetail: any;
  choosenForm: { treatmentID: any; agentDiscountID: any; agentBranchID: any; };
  submitChoosenTreatment : Array < any > = []
  
  list2 : any;
  list1 : any;
  treatmentList : Array < any >;
  form : {};
  list : any;

  checkedItems : boolean[];

  @ViewChild('mySlider')slider : Slides;
  selectedSegment : string;
  slides : any;
  treatments : any[]
  checked : boolean[]
  constructor(private serviceApi : ServiceApiProvider, public navCtrl : NavController, public navParams : NavParams) {
    this.selectedSegment = 'first';
    this.slides = [
      {
        id: "first",
        title: "First Slide"
      }, { //benda boleh tulis kat sini kan haha
        id: "second",
        title: "Second Slide"
      }, {
        id: "third",
        title: "Third Slide"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreatmentprovidersPage');
    this.getListTreatment()
  }

  getListTreatment() {
    this.list1 = this.navParams.get("agentId")
    this.list2 = this.navParams.get("treatmentProId")
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

  choosenTreatment(treatmentID,status,agentDiscountId,agentBranchId) {
    this.discountId = agentDiscountId
    this.branchId = agentBranchId
    console.log(agentBranchId)
    if (status == true) {
      this.choosenForm = {
        treatmentID: treatmentID,
        agentDiscountID:agentDiscountId,
        agentBranchID:agentBranchId
      }
      this.submitChoosenTreatment.push(this.choosenForm)
      console.log(this.submitChoosenTreatment)  
      } else {
      this.choosenForm = {
        treatmentID: treatmentID,
        agentDiscountID:agentDiscountId,
        agentBranchID:agentBranchId
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
      TreatmentSelectedViewModel:this.submitChoosenTreatment
    }
    console.log("choosen",this.form)
    console.log("Choosentreatment",this.submitChoosenTreatment)
    this.serviceApi.postBookingMain(this.form).subscribe(data => {
      this.bookingDetail = data
      this.applicationId = this.bookingDetail.applicationMainDetail[0].applicationID
      this.applicationDetail = this.bookingDetail.applicationMainDetail
      console.log("bookingDetail",this.bookingDetail)      
      console.log("AppID TreatPro",this.appID)
      console.log("applicationMainDetail",this.applicationDetail)      
      this.navCtrl.push(SetDayAppointmentPage,{
        applicationID :this.applicationId,
        agentDiscountID:this.discountId,
        agentBranchID:this.branchId,
        applicationMainDetail:this.applicationDetail
      })
    })
 
  }

}
