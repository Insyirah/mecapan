import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetTimeAppointmentPage } from '../set-time-appointment/set-time-appointment';
import { CalendarComponentOptions, DayConfig } from "ion2-calendar/dist";
import moment from "moment"
import { ServiceApiProvider } from '../../providers/service-api/service-api';
@IonicPage()
@Component({
  selector: 'page-set-day-appointment',
  templateUrl: 'set-day-appointment.html',
})
export class SetDayAppointmentPage {
  disabledProceed: boolean = true;
  form: { agentBranchID: any; };
  getDate: { agentBranchID: any; };
  applicationDetail: any;
  branchId: any;
  discountId: any;
  applicationId: any;
  maxDayCanBook: number
  selectedDate: any;
  harini: Date = new Date()
  previousMonths: boolean = false
  nextmonths: boolean = false
  data: any = []
  newmonth: Date;
  TarikhMax: Array<any> = []
  disableDay: Array<number> = []
  calendar: Date = new Date()
  date: string;
  todayDate: Date = new Date();
  maxDatebooking: Date
  calendarDefault: any
  daysDisable: DayConfig[] = [];
  CalendarOptions: CalendarComponentOptions

  constructor(private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.SetupCalender()
    this.getFulldate()
  }

  SetupCalender() {

    this.maxDayCanBook = 60
    this.calendarDefault = {
      todayDate: new Date(this.todayDate),
      dateOutputType: "string",
    }
    let v = new Date(this.todayDate)
    this.maxDatebooking = new Date(v.setDate(v.getDate() + 60))

    this.CalendarOptions = {
      daysConfig: this.daysDisable,
      showToggleButtons: true,
      disableWeeks: this.disableDay,
      showMonthPicker: false,
      from: this.todayDate,
      to: this.maxDatebooking
    };


    this.CalendarOptions.disableWeeks = [0, 6]
    this.DisableMaxDate()
    this.DisableBookedDate()
  }

 

  DisableMaxDate() {
    let TD = new Date()
    let LastDateCanBook = new Date(TD.setDate(TD.getDate() + this.maxDayCanBook))//last day can book
    console.log("LastDateCanBook", LastDateCanBook)

    let p = new Date(LastDateCanBook.getFullYear(), LastDateCanBook.getMonth() + 1, 1)//get next mont

    let maxDayOfLastMonthCanBook = new Date(p.setDate(p.getDate() - 1))// get max day of that month

    for (let i = LastDateCanBook.getDate(); i <= maxDayOfLastMonthCanBook.getDate(); i++) {
      let pok = {
        date: new Date(LastDateCanBook.getFullYear(),
          LastDateCanBook.getMonth(), i)
          .toDateString()
      }
      this.data.push(pok)
    }

    for (let l = 1; l <= maxDayOfLastMonthCanBook.getDate() + 1; l++) { // for the next month

      let lala = {
        date: new Date(LastDateCanBook.getFullYear(),
          LastDateCanBook.getMonth() + 1, l)
          .toDateString()
      }
      this.data.push(lala)
    }


    for (let i = 0; i < this.data.length; i++) {
      this.daysDisable.push({
        date: new Date(this.data[i].date),
        subTitle: "FULL", // ni tukar la ikut citarasa
        disable: true,
        marked: true
      })
    }

        // kawan ni pening sikit sbb aku pun dh pening ni hahaha
        //nanti aku kemas kan lagi
        // setakat ni gini la

  }

  DisableBookedDate(){
    // panggil api
     let Data = this.data = [{ date: "2017-11-13" }, { date: "2017-11-16" }, { date: "2017-11-18" }, { date: "2017-11-20" }, { date: "2017-11-22" }]
    // huhu gitu la
    //pastikan dlm bentuk ni kalau boleh la [{ date: "2017-11-13" }, { date: "2017-11-16" }, { date: "2017-11-18" }, { date: "2017-11-20" }, { date: "2017-11-22" }]
   for (let i = 0; i < Data.length; i++) {
      this.daysDisable.push({
        date: new Date(this.data[i].date),
        subTitle: "Booked", // ni tukar la ikut citarasa
        disable: true,
        marked: true
      })
    }
  
  
  }

  pickedDate(x) {
    this.disabledProceed == false ? "" : this.disabledProceed = false;
    this.selectedDate = x
    console.log(x, " huhu");
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SetDayAppointmentPage');
  // }

  async setTime(x) {
    this.applicationId = this.navParams.get('applicationID')
    this.discountId = this.navParams.get('agentDiscountID')
    this.branchId = this.navParams.get('agentBranchID')
    this.applicationDetail = this.navParams.get('applicationMainDetail')

    console.log("AppID", this.applicationId)
    console.log("DiscID", this.discountId)
    console.log("BrancID", this.branchId)

    await this.navCtrl.push(SetTimeAppointmentPage, {
      date: this.selectedDate,
      applicationID: this.applicationId,
      agentDiscountID: this.discountId,
      agentBranchID: this.branchId,
      applicationMainDetail: this.applicationDetail
    })
  }

  getFulldate() {
    this.branchId = this.navParams.get('agentBranchID')

    this.form = {
      agentBranchID: this.branchId
    }
    this.serviceApi.getBookingCalendar(this.form).subscribe(data => {
      console.log(data)
    })
  }


}














// stand by dont delete





//  nextMonth() {
//     // let v = new Date(this.calendarDefault.todayDate)
//     // this.calendarDefault.todayDate = new Date(v.setMonth(v.getMonth() + 1))// utk pergi ke next month

//     // this.previousMonths = false
//     // let x = new Date()
//     // console.log("arini" + x)

//     // let LastDateCanBook = new Date(x.setDate(x.getDate() + this.maxDayCanBook ))
//     // console.log(LastDateCanBook)
//     // if (v.getMonth() == LastDateCanBook.getMonth()) {
//     //   this.nextmonths = true
//     // }

//   }

//   previousMonth() {
//     // let p = new Date(this.calendarDefault.todayDate)
//     // this.calendarDefault.todayDate = new Date(p.setMonth(p.getMonth() - 1))// utk pergi ke previous month

//     // this.nextmonths = false
//     // // let LastDateCanBook = new Date(this.todayDate.setDate(this.todayDate.getDay() + 60))
//     // let x = new Date()

//     // if (p.getMonth() == x.getMonth()) {
//     //   this.previousMonths = true
//     // }
//   }