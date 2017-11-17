import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetTimeAppointmentPage } from '../set-time-appointment/set-time-appointment';
import { CalendarComponentOptions, DayConfig } from "ion2-calendar/dist";
import moment from "moment"
@IonicPage()
@Component({
  selector: 'page-set-day-appointment',
  templateUrl: 'set-day-appointment.html',
})
export class SetDayAppointmentPage {
  applicationDetail: any;
  branchId: any;
  discountId: any;
  applicationId: any;

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
  calendarDefault: any = {
    todayDate: new Date(),//ngmodel
    dateOutputType: "string",
  }
  daysDisable: DayConfig[] = [];
  CalendarOptions: CalendarComponentOptions = {
    daysConfig: this.daysDisable,
    showToggleButtons: false,
    disableWeeks: this.disableDay,
    showMonthPicker: false
  };
  todayDate: Date = new Date()

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.CalendarOptions.disableWeeks = [0, 6]
    this.DisableDate()

   
    //   this.disableMonth()
    //  console.log(moment())
  }

  // ngAfterViewInit(){
  //   /* Calls `this.calc()` after receiving an initial date */
  //   this.todayDate.setHours(0, 0, 0, 0);

  //   setTimeout(() => {
  //     // this.calc();
  //     this.calendarDefault.todayDate();
  //   });
  // }

  setToday(){
    let tmp = new Date();
    // tmp.setHours(0,0,0,0);
    let today = new Date(this.calendarDefault.todayDate)
    // let calc : boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.todayDate.getMonth() + "" + this.todayDate.getFullYear();
    // console.log("calc :", calc)
    // let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.todayDate.getMonth() + "" + this.todayDate.getFullYear();
    if (tmp.getMonth() + "" + tmp.getFullYear() == this.todayDate.getMonth() + "" + this.todayDate.getFullYear()){
      this.calendarDefault.todayDate();
      console.log("TODAY :", today)
    }
  }

  nextMonth() {
    let v = new Date(this.calendarDefault.todayDate)
    this.calendarDefault.todayDate = new Date(v.setMonth(v.getMonth() + 1))// utk pergi ke next month

    this.previousMonths = false
    let x = new Date()
    console.log("arini" + x)

    let LastDateCanBook = new Date(x.setDate(x.getDate() + 60))
    console.log(LastDateCanBook)
    if (v.getMonth() == LastDateCanBook.getMonth()) {
      this.nextmonths = true
    }

  }

  previousMonth() {
    let p = new Date(this.calendarDefault.todayDate)
    this.calendarDefault.todayDate = new Date(p.setMonth(p.getMonth() - 1))// utk pergi ke previous month

    this.nextmonths = false
    // let LastDateCanBook = new Date(this.todayDate.setDate(this.todayDate.getDay() + 60))
    let x = new Date()

    if (p.getMonth() == x.getMonth()) {
      this.previousMonths = true
    }
  }

  DisableDate() {

    let LastDateCanBook = new Date(this.todayDate.setDate(this.todayDate.getDate() + 60))//last day can book

    let month = this.todayDate.getMonth()
    let po = this.todayDate.getFullYear()
    let p = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 1)

    let maxDayOfMonth = new Date(p.setDate(p.getDate() - 1))

    for (let i = LastDateCanBook.getDate(); i <= maxDayOfMonth.getDate(); i++) {
      let pok = { date: new Date(LastDateCanBook.getFullYear(), LastDateCanBook.getMonth(), i).toDateString() }
      this.data.push(pok)
    }
    console.log(this.data)


    // this.data = [{ date: "2017-11-13" }, { date: "2017-11-16" }, { date: "2017-11-18" }, { date: "2017-11-20" }, { date: "2017-11-22" }]

    for (let i = 0; i < this.data.length; i++) {
      this.daysDisable.push({
        date: new Date(this.data[i].date),
        subTitle: "FULL",
        disable: true,
        marked: true
      })
    }
  }

  pickedDate(x) {
    this.selectedDate = x
    console.log(x, " huhu");
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SetDayAppointmentPage');
  // }

  setTime(x) {
    this.applicationId = this.navParams.get('applicationID')
    this.discountId= this.navParams.get('agentDiscountID')
    this.branchId = this.navParams.get('agentBranchID')
    this.applicationDetail =this.navParams.get('applicationMainDetail')

    console.log("AppID",this.applicationId)
    console.log("DiscID",this.discountId)
    console.log("BrancID",this.branchId)
    
    this.navCtrl.push(SetTimeAppointmentPage,{
      date : this.selectedDate,
      applicationID:this.applicationId,
      agentDiscountID:this.discountId,
      agentBranchID:this.branchId,
      applicationMainDetail:this.applicationDetail
    })
  }

}

