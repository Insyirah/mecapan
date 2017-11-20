import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { TreatmentprovidersPage } from '../treatmentproviders/treatmentproviders';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { FormControl } from "@angular/forms";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
//import { debounceTime } from 'rxjs/operator/debounceTime';
//import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
//import { switchMap } from 'rxjs/operator/switchMap';

@IonicPage()
@Component({
  selector: 'page-listproviders',
  templateUrl: 'listproviders.html',
})
export class ListprovidersPage {
  test: Array<any> = []
  sortingId: any;
  searchId: any = 96;
  keyword: any;
  noProvider: boolean = true
  firstOnly: boolean = false
  search: Observable<string[]>;
  loading: Loading;
  searchType: string;
  items: Array<string> = ["no Provider"]
  searching: boolean = true
  show: Array<any>;
  providerId: any;
  form: {};
  providers: any = []
  terms = new FormControl();
  seachInput: string;
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  marker: any[];
  constructor(public event: Events, public loadingCtrl: LoadingController, private serviceApi: ServiceApiProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.searchType = "Rating"
    this.selectedSegment = 'first';
    this.slides = [
      {
        id: "first",
        title: "First Slide"
      },
      {
        id: "second",
        title: "Second Slide"
      }
    ];

    this.marker = [3.135111, 101.684282];
    // this.handleSearch()//utk search
    this.getListProvider()
  }

  // async handleSearch() {

  //   this.search = this.terms.valueChanges
  //     .debounceTime(300)
  //     .distinctUntilChanged()
  //     .do(() => {
  //       this.firstOnly == false ? this.search : this.searching = false
  //     })
  //     .switchMap(term => this.serviceApi.goSearch(term, this.searchType))

  //   this.search.subscribe(x => {
  //     this.searchLogic(x)
  //   })
  // }


  // searchLogic(data) {
  //   if (this.firstOnly == false) {
  //     this.firstOnly = true
  //     this.getListProvider()
  //   } else {
  //     this.searching = true
  //     this.providers = data
  //     console.log(this.providers)
  //     this.providers.length == 0 ? this.noProvider = false : this.noProvider = true
  //   }
  // }

  // goSearch() {//for yg filter type
  //   this.serviceApi.goSearch(this.seachInput, this.searchType)
  // }

  getListProvider() {
    this.providerId = this.navParams.get("treatmentId")

    this.form = {
      treatmentProvidedDetailID: this.providerId,
      searchValue: this.keyword,
      searchID: this.searchId,
      sortingID: this.sortingId
    }

    this.serviceApi.getProviderList(this.form).subscribe(data => {
      this.providers = data.branchList
      console.log("data", this.providers)


      // console.log("agentBranchID", this.providers[0].agentBranchID)
      this.searching = true
      this.loading.dismiss();
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

  goTreatment(agentBranchID, treatmentProvidedID) {
    this.navCtrl.push(TreatmentprovidersPage, {
      agentId: agentBranchID,
      treatmentProId: treatmentProvidedID
    })
  }

  filterType() {
    console.log("c")
    let alert = this.alertCtrl.create({
      title: 'Please select:',
      inputs: [
        {
          type: 'radio',
          label: 'Rating',
          value: 'Rating',
          checked: true
        },
        {
          type: 'radio',
          label: 'Price low to high',
          value: 'Pricelowtohigh'
        },
        {
          type: 'radio',
          label: 'Price high to low',
          value: 'Pricehightolow'
        },
        {
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
        },
        {
          text: "Ok",
          handler: data => {
            this.searchType = data
            console.log(data)

            this.sortProvider(data)
          }

        }
      ]
    });
    alert.present()
  }

  sortProvider(sortType) {
    switch (sortType) {
      case "Rating":
        {
          let v = this.providers
          console.log(this.providers)
          console.log(this.providers)

          this.providers = v.sort((X, Y) => { return Y - X })
        }
        break
        ;
      case "Pricelowtohigh":
        {
          let q = this.providers
          

          this.providers = q.sort((X, Y) => { return Y.agentBranchID - X.agentBranchID })
          console.log(this.providers)
        }
        case "Pricehigtolow":
        {
          let q = this.providers
          

          this.providers = q.sort((X, Y) => { return Y.agentBranchID - X.agentBranchID })
          console.log(this.providers)
        }
        break;
        case "Discount":
        {
          let q = this.providers
          

          this.providers = q.sort((X, Y) => { return Y.agentBranchID - X.agentBranchID })
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
}
