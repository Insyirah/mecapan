import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
// import { HttpHeaders } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'ng2-webstorage';
import { Events } from 'ionic-angular';


@Injectable()
export class ServiceApiProvider {
  applicationId: string;
    loginId: any;
    user: any;
    url2: string;
    url1: string;
    userId: any;
    url: string

    host: string = "http://35.203.181.89:300/"
    constructor(public http: Http,private storage: LocalStorageService,public events: Events) {
        this.user = this.storage.retrieve("user")
        console.log("user",this.user)
        
        if (this.user == null) {
            this.loginId = 0
            this.userId = 0
          }
          else {
            this.loginId = this.user.listDetail.loginID
            this.userId = this.user.listDetail.userID
            console.log("loginID", this.loginId)
          }     

          this.events.subscribe('Login', (userEventData) => {
            this.user = this.storage.retrieve("user")
            console.log("service")
            this.loginId = this.user.listDetail.loginID
            this.userId = this.user.listDetail.userID
          })
      
    }


    // postLoginFacebook(form): Observable<any> {
    //     return this.http.post(this.url + 'loginFB', form, {
    //         headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    //     })
    // }
      
    // postLoginGoogle(form): Observable<any> {
    //     return this.http.post(this.url + 'loginGoogle', form, {
    //         headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    //     })
    // }

    // postLoginMeccapan(form): Observable<any> {
    //     return this.http.post(this.url + 'loginMeccapan', form, {
    //         headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    //     })
    // }

    // postRegister(form): Observable<any> {
    //     return this.http.post(this.url + 'PostRegister', form, {
    //         headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    //     })
    // }

    

    postRegister(form): Observable<any> {//registerpage(done)
        let url = this.host + 'Login/Register/api/PostRegister'
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, form, options)
          .map((res: Response) => res.json());
      }

    getVerificationCode(phoneNumber): Observable<any[]> {//registerpage(done)
        let url = this.host + 'global/verificationcode/api/getverificationcode/' + phoneNumber;
        console.log(url)
        return this.http.get(url)
          .map((res: Response) => res.json()
          );
      }

    postLoginMeccapan(form): Observable<any> {//signinpage(done)
        let url = this.host + 'Login/Login/api/PostLoginMeccapan'
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, form, options)
          .map((res: Response) => res.json());
    }

    getTreatmentMasterData(): Observable<any> {//homepage(notDone)
      let url = this.host + 'Global/api/GetTreatmentMasterData'
      console.log(url)
      return this.http.get(url).map((res: Response) => res.json()
        );
    }

    getSkinType(form): Observable<any> {//contactpage(notDone)
        let url = this.host + 'Global/api/GetMasterData/'+form.moduleName+'/'+form.masterName;
        console.log(url)
        return this.http.get(url)
          .map((res: Response) =>{ 
              console.log(res.json())
        return res.json().masterData}
          );
      }

    getProfile(): Observable<any[]> {//contactpage(done)
        let url = this.host + 'Dashboard/User/api/GetProfile/'+this.loginId
        console.log(url)
        return this.http.get(url)
          .map((res: Response) => res.json()
          );
    }

    postUpdateDetail(form): Observable<any> {//contactpage(notDone)
        let url = this.host + 'Dashboard/User/api/PostUpdateDetail'
        console.log(url)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, form, options)
          .map((res: Response) => res.json());
    }

    getProviderList(form): Observable<any> {//listproviderpage
        let url = this.host + 'UserApplication/api/GetProviderList/'+form.treatmentProvidedDetailID
        console.log(url)
        return this.http.get(url)
          .map((res: Response) => res.json()
          );
    }

    getTreatmentList(form): Observable<any> {//treatmentproviderpage(Done)
        let url = this.host + 'UserApplication/api/GetTreatmentList/'+form.agentBranchID + "/" + form.treatmentProvidedID
        console.log(url)
        return this.http.get(url)
          .map((res: Response) => res.json()
          );
    }

    postBookingMain(form): Observable<any> {//treatmentproviderpage(Done)
      let url = this.host + 'UserBooking/api/PostBookingMain/'+ this.userId
      console.log(url)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, form, options)
        .map((res: Response) => res.json());
  }

  getBookingSlot(form): Observable<any> {//treatmentproviderpage(Done)
    let url = this.host + 'UserBooking/api/GetBookingSlotList'
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, form, options)
      .map((res: Response) => res.json());  
}

  postBookingSlot(form): Observable<any> {
    let url = this.host + 'UserBooking/api/PostBookingSlot'
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, form, options)
    .map((res: Response) => res.json());
}

postSummaryBooking(form): Observable<any> {
  let url = this.host + 'UserBooking/api/PostSummaryBooking/'+ form.applicationID
  console.log(url)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, form, options)
  .map((res: Response) => res.json());
}

getSummaryBooking(form): Observable<any> {
  let url = this.host + 'UserBooking/api/GetSummaryBooking/' + form.applicationID
  console.log(url)
  return this.http.get(url)
    .map((res: Response) => res.json()
    );
}

postSubmitBooking(form): Observable<any> {
  let url = this.host + 'UserBooking/api/PostSubmitBooking/'+ form.applicationID
  console.log(url)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, form, options)
  .map((res: Response) => res.json());
}

getUserBookingActivity(): Observable<any> {
  let url = this.host + 'Dashboard/User/api/GetUserBookingActivity/' + this.userId
  console.log(url)
  return this.http.get(url)
    .map((res: Response) => res.json()
    );
}

postCancelBooking(form): Observable<any> {
  let url = this.host + 'UserBooking/api/PostCancelBooking/'+ form.applicationID
  console.log(url)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, form, options)
  .map((res: Response) => res.json());
}

getCheckBookingSlot(form): Observable<any> {
  let url = this.host + 'UserBooking/api/GetCheckingBookingSlot'
  console.log(url)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, form, options)
  .map((res: Response) => res.json());
}








  
  


   
    


    
      
    

    

}