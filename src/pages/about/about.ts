import {Component, ViewChild} from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { BookingDetailsPage } from '../booking-details/booking-details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
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

    this.getBookingActivity()

  }

  getBookingActivity(){
    this.serviceApi.getUserBookingActivity().subscribe(data => {
      this.bookingUpcomingStatus = data.upcomingBooking
      this.bookingRecentStatus=data.recentBooking
      console.log(data)
      console.log("upcoming",this.bookingUpcomingStatus)
      console.log("recent",this.bookingUpcomingStatus)      
      console.log("po",this.bookingUpcomingStatus.storeName)
      this.store=this.bookingUpcomingStatus.storeName
      this.date=this.bookingUpcomingStatus.appointmentDate
    })
    this.rejected = [
      {name:'Johny Saloons',treatment:"Eyelashes, Haircut",date:"Wednesday, March 20, 2PM"},
      {name:'Johny Saloons',treatment:"Lash Extension",date:"Wednesday, March 20, 2PM"},
    ]
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
