import {Component, ViewChild} from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { BookingDetailsPage } from '../booking-details/booking-details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  bookingCompletedStatus: any;
  bookingRejectStatus: Array<any>;
  form: {};
  applicationId: any;
  date: any;
  store: any;
  bookingRecentStatus:Array<any>;
  
  bookingUpcomingStatus:any;
  @ViewChild('mySlider')slider : Slides;
  selectedSegment: string;
  slides: any;
  providerr:any;
  completed:any;
  rejected:any;

  constructor(private serviceApi: ServiceApiProvider,public navCtrl: NavController,public navParams : NavParams) {
    
    this.selectedSegment = 'first';
    this.slides = [
      {
        id: "first",
        title: "First Slide"
      },
      {
        id: "second",
        title: "Second Slide"
      },
      {
        id: "third",
        title: "Third Slide"
      }
    ];

    this.providerr = [
      {name:'Johny Saloons',treatment:"Eyelashes, Haircut",date:"Wednesday, March 20, 2PM",status:1},
      {name:'Johny Saloons',treatment:"Rebonding",date:"date",status:2},
      {name:'Johny Saloons',treatment:"Rebonding",date:"date",status:3},

    ];

    this.completed = [
      {name:'Johny Saloons',treatment:"Eyelashes, Haircut",date:"Wednesday, March 20, 2PM"},
    ];

    // this.getBookingActivity()
    this.getRecentBookingActivity()
    this.getRejectedBookingActivity()
    this.getCompletedBookingActivity()
    location.reload()
    this.navCtrl.setRoot(AboutPage)
  }

  getRecentBookingActivity(){
    this.serviceApi.getRecentBookingActivity().subscribe(data => {
      this.bookingRecentStatus=data.recentBooking
      this.bookingUpcomingStatus = data.upcomingBooking
      console.log("data",data)
      console.log("upcoming",this.bookingUpcomingStatus)      
      console.log("recent",this.bookingRecentStatus)
      console.log("upcoming",this.bookingUpcomingStatus)
      // this.store=this.bookingUpcomingStatus.storeName
      // this.date=this.bookingUpcomingStatus.appointmentDate
    })
    this.rejected = [
      {name:'Johny Saloons',treatment:"Eyelashes, Haircut",date:"Wednesday, March 20, 2PM"},
      {name:'Johny Saloons',treatment:"Lash Extension",date:"Wednesday, March 20, 2PM"},
    ]
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  getRejectedBookingActivity(){
    this.serviceApi.getRejectedBookingActivity().subscribe(data => {
      this.bookingRejectStatus = data.rejectedBooking
    console.log("data rejected",this.bookingRejectStatus)
    }) 
  }

  getCompletedBookingActivity(){
    
    this.serviceApi.getCompletedBookingActivity().subscribe(data => {
      this.bookingCompletedStatus = data.completedBooking
    console.log("data complete",data.completedBooking)
    }) 
  }

  viewBooking(status){
    this.navCtrl.push(BookingDetailsPage,{
      recentStatusDetail:status
    })
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

}
