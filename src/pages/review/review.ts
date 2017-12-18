import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  description: any;
  userReviewDetail: { agentBranchID: any; userID: any; applicationID: any; ratingStarID: number; review: string; };
  completeDetail: any;
  checkRate: Array<any> = [];
  halfStarIconName: boolean;
  rate: number;
  constructor(private serviceApi: ServiceApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getCompleteDetail()
  }

  onModelChange(a) {
    console.log(a)
    let p = this.checkRate.length
    console.log("cr",this.checkRate[0])
    if (this.checkRate[0] != a) {
     // this.checkRate.pop()
      
      this.checkRate.push(a)
      console.log(this.checkRate.length)
      this.rate = a - 0.5//display
    } else if (this.checkRate[0] == a){
      this.rate = a
      this.checkRate.pop()
      console.log(this.checkRate.length)
    }
  }

  getCompleteDetail(){
    this.completeDetail = this.navParams.get('reviewDetail')
    console.log('completeDetail',this.completeDetail)
  }

  postUserReview(){
    this.userReviewDetail = {
      agentBranchID:this.completeDetail.agentBranchID,
      userID:this.completeDetail.userID,
      applicationID:this.completeDetail.applicationID,
      ratingStarID:57,
      review:this.description
    }
    console.log("user review",this.userReviewDetail)
    
    console.log("userReviewDetail",this.userReviewDetail)
    this.serviceApi.postReview(this.userReviewDetail).subscribe(data => {
    console.log("data review",data)
    }) 
  }



}
