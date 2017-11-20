import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetDayAppointmentPage } from '../set-day-appointment/set-day-appointment';
import { ConfirmBookingPage } from '../confirm-booking/confirm-booking';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { LocalStorageService } from 'ng2-webstorage';

/**
 * Generated class for the SetTimeAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-time-appointment',
  templateUrl: 'set-time-appointment.html',
})
export class SetTimeAppointmentPage {
  name2: any;
  name1: any;
  name: any;
  applicationDetail: any;
  checkSlot: { applicationID: any; agentSlotID: any; applicationBookingDate: any; };
  booking: any;
  AgentSlotID: any;
  fomss: { applicationID: any; };
  forms: { applicationID: any; agentSlotID: any; applicationBookingDate: any; };
  slots: any = {}
  choose: any;
  slot: any;
  branchId: any;
  discountId: any;
  applicationId: any;
  timeSlot: Array<any> = []
  form: { applicationID: any; agentDiscountID: any; agentBranchID: any; applicationSlotDate: any; };
  dates: any;
  bookDate: any;
  times: any[]
  constructor(private storage: LocalStorageService, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.bookDate = this.navParams.get("date")
    console.log("bookDate", this.bookDate)
    this.getTimeSlot()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetTimeAppointmentPage');
  }

  getTimeSlot() {
    // console.log("slotId",slotId)
    this.applicationId = this.navParams.get('applicationID')
    this.discountId = this.navParams.get('agentDiscountID')
    this.branchId = this.navParams.get('agentBranchID')
    this.dates = this.navParams.get('date')
    this.applicationDetail = this.navParams.get('applicationMainDetail')

    console.log("AppIDT", this.applicationId)
    console.log("DiscIDT", this.discountId)
    console.log("BrancIDT", this.branchId)
    console.log("Dates", this.dates)
    console.log("ApplicationDetail",this.applicationDetail)

    this.name = this.applicationDetail[0].treatmentName.ParameterValue
    this.name1 = this.applicationDetail[1].treatmentName.ParameterValue
    // this.name2 = this.applicationDetail[2].treatmentName.ParameterValue
    
    
    console.log("nama",this.name)
    this.form = {
      applicationID: this.applicationId,
      agentDiscountID: this.discountId,
      agentBranchID: this.branchId,
      applicationSlotDate: this.dates
    }
    console.log("form", this.form)
    this.serviceApi.getBookingSlot(this.form).subscribe(data => {
      this.timeSlot = data.availableSlot
      //  this.storage.store("timeSlot",this.timeSlot)
      console.log(this.timeSlot)
    })
  }


  chooseSlot(startHour) {
    console.log(startHour)
    console.log(this.slot)

    let p = this.timeSlot.filter(x => { return x.startHour == startHour })
    let o = p[0]
    console.log("o",o)

    this.AgentSlotID = o.agentSlotID
    this.slot = o.startHour
    console.log(this.slot)

    this.checkSlot = {
      applicationID: this.applicationId,
      agentSlotID:this.AgentSlotID,
      applicationBookingDate: this.dates
    }

    this.serviceApi.getCheckBookingSlot(this.checkSlot).subscribe(data => {
      console.log(data)
      if(data.test == "NotOk"){
        alert("cannot choose this slot as not enough for treatment that you have choose.Please choose another slot")
        
      }
    })
  }

  setBooking() {
    this.forms = {
      applicationID: this.applicationId,
      agentSlotID: this.AgentSlotID,
      applicationBookingDate: this.dates
    }
    console.log(this.form)
    this.serviceApi.postBookingSlot(this.forms).subscribe(data => {
      console.log(data)
      console.log(1)
      this.postSummaryBooking()
    })
  }

  postSummaryBooking() {
    this.fomss = {
      applicationID: this.applicationId,
    }
    this.serviceApi.postSummaryBooking(this.fomss).subscribe(data => {
      console.log(data)
      console.log(2)
      this.getSummaryBooking()
    })
  }

  async getSummaryBooking() {
    await this.serviceApi.getSummaryBooking(this.fomss).subscribe(data => {
      this.booking=data.summaryDetail
      console.log(this.booking)
      console.log(3)
      this.navCtrl.push(ConfirmBookingPage, {
        detailBooking : this.booking,
        applicationID: this.applicationId
      })
    })
    

  }

}
