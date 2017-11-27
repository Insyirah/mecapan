import {Component, ViewChild} from '@angular/core';
import { NavController, Slides, IonicPage, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { BookingDetailsPage } from '../booking-details/booking-details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  loading: Loading;
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

  constructor(public loadingCtrl: LoadingController,private serviceApi: ServiceApiProvider,public navCtrl: NavController,public navParams : NavParams) {
    
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

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present()

    // this.getBookingActivity()
    this.getRecentBookingActivity()
    this.getRejectedBookingActivity()
    this.getCompletedBookingActivity()

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

  doRefresh(refresher) {
    this.getRecentBookingActivity()
    refresher.complete();
    this.getRejectedBookingActivity()
    refresher.complete();
    this.getCompletedBookingActivity()
    refresher.complete();
    console.log('Begin async operation', refresher);

    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }

  getRejectedBookingActivity(){
    this.serviceApi.getRejectedBookingActivity().subscribe(data => {
      this.bookingRejectStatus = data.rejectedBooking
    console.log("data rejected",this.bookingRejectStatus)
    }) 
    this.loading.dismiss()
  }

  getCompletedBookingActivity(){
    
    this.serviceApi.getCompletedBookingActivity().subscribe(data => {
      this.bookingCompletedStatus = data.completedBooking
    console.log("data complete",data.completedBooking)
    }) 
    this.loading.dismiss()
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
