import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { TreatmentprovidersPage } from '../treatmentproviders/treatmentproviders';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { LocalStorageService } from 'ng2-webstorage';
import { Geolocation } from '@ionic-native/geolocation';

// import { debounceTime } from 'rxjs/operator/debounceTime'; import {
// distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'; import {
// switchMap } from 'rxjs/operator/switchMap';

@IonicPage()
@Component({ selector: 'page-listproviders', templateUrl: 'listproviders.html' })
export class ListprovidersPage {
  longitude: number;
  latitude: number;
  handleChecked: { value: string; checked: boolean; }[];
  seachInput: any;
  hehe: any
  filter: FormGroup;
  sortingId: number;
  searchId: any = 96;
  keyword: any;
  search: Observable<any[]>;
  loading: Loading;
  searchType: string;

  searching: boolean = true
  providerId: any;
  form: {};
  providers: Array<any> = []
  terms = new FormControl();
  selectedSegment: string;
  slides: any;
  marker: any[];

  @ViewChild('mySlider') slider: Slides;

  constructor(private geolocation: Geolocation,public fb: FormBuilder, public event: Events, public loadingCtrl: LoadingController, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loading.present();
    this.SetupSlider()
    this.SetupSearchFormGroup()
    this.marker = [3.135111, 101.684282];
    this.getCurrentLocation()
    this.handleSearch() //utk search
    // this.getListProvider()
  }

  HandleImage(data) {
    return this.serviceApi.ImageHandler(data)
  }

  SetupSlider() {
    this.slides = [
      {
        id: "first",
        title: "First Slide"
      }, {
        id: "second",
        title: "Second Slide"
      }
    ];
  }

  SetupSearchFormGroup() {
    this.filter = this.fb.group({ searchBy: [''] });
    this.searchType = "Rating"
    this.selectedSegment = 'first';
    this.seachInput = ''
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => { //get user current location
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude
      console.log("lati", resp.coords.latitude)
      console.log("longi", resp.coords.longitude)
      // this.handleSearch(this.latitude, this.longitude)
    }).catch((error) => {
      alert("cannot get location")
      console.log('Error getting location', error);
    });
    // loader.dismiss()
  }

  goFilter(choosenSearchBy) {
    this.searchId = choosenSearchBy.searchBy
    console.log("choosenSearchBy", choosenSearchBy)
  }

  handleSearch() {
    this.providerId = this.navParams.get("treatmentId")
    this.search = this.terms.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .do((x) => {
        this.form = {
          treatmentProvidedDetailID: this.providerId,
          searchValue: x,
          searchID: this.searchId,
          sortingID: this.sortingId,
          lat:this.latitude,
          lng:this.longitude
        }
        //  console.log(this.form)
        //console.log("cd", x)
        console.log("form",this.form)
      })
      .switchMap(term => this.serviceApi.getProviderList(this.form))//switchmap tu observable so kena ada subscribe

    this.search.subscribe(x => {
      this.providers = x
      console.log("dataProvider", this.providers)
      this.loading.dismiss()
    })

  }

 

  filterType() {
    let alert = this.alertCtrl.create({
      title: 'Please select',
      inputs: [
        {
          type: 'radio',
          label: 'Rating',
          value: 'Rating',
          checked: true
        }, {
          type: 'radio',
          label: 'Price low to high',
          value: 'Price low to high'
        }, {
          type: 'radio',
          label: 'Price high to low',
          value: 'Price high to low'
        }, {
          type: 'radio',
          label: 'Discount',
          value: 'Discount'
        }
      ],
      buttons: [

        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        }, {
          text: "Ok",
          handler: data => {
            this.searchType = data
            console.log(data)
            this.sortProvider(data)
          }
        }
      ]
    });

    this.handleChecked = [{ value: "Rating", checked: false }, { value: "Price low to high", checked: false }, { value: "Price high to low", checked: false }, { value: "Discount", checked: false }]
    alert.present()

  }

  sortProvider(sortType) {
    switch (sortType) {
      case "Rating":
        {
          let v = this.providers
          console.log(this.providers)
          this.providers = v.sort((X, Y) => { return X.ratingSign - Y.ratingSign })
        }
        break;
      case "Price low to high":
        {
          let lh = this.providers
          this.providers = lh.sort((X, Y) => { return X.priceRangeSign - Y.priceRangeSign })
          console.log("lowHigh", this.providers)
        }
        break;
      case "Price high to low":
        {
          let hl = this.providers
          this.providers = hl.sort((X, Y) => { return Y.priceRangeSign - X.priceRangeSign })
          console.log("highLow", this.providers)
        }
        break;
      case "Discount":
        {
          let d = this.providers
          this.providers = d.sort((X, Y) => { return X.discountPercent - Y.discountPercent })
          console.log(this.providers)
        }
        break;
      // case 4:
      //   day = "Thursday";
      //   break;
      // case 5:
      //   day = "Friday";
      //   break;
      // case 6:
      //   day = "Saturday";
    }


  }



  onSegmentChanged(segmentButton) {
    //  console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this
      .slides
      .findIndex((slide) => {
        return slide.id === segmentButton.value;
      });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    //  console.log('Slide changed');
    const currentSlide = this.slides[slider.getActiveIndex()];
    this.selectedSegment = currentSlide.id;
  }

  goTreatment(agentBranchID, treatmentProvidedID) {
    this.navCtrl.push(TreatmentprovidersPage, {
      agentId: agentBranchID,
      treatmentProId: treatmentProvidedID
    })
  }






}







  // getListProvider() {
  //   this.providerId = this.navParams.get("treatmentId")

  //   this.form = {
  //     treatmentProvidedDetailID: this.providerId,
  //     searchValue: this.keyword,
  //     searchID: this.searchId,
  //     sortingID: this.sortingId
  //   }

  //   this.serviceApi.getProviderList(this.form).subscribe(data => {
  //     this.providers = data
  //   //  console.log("data", data)

  //     this.searching = true
  //     // this.loading.dismiss();
  //   })
  // }