import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class LoginService {
    headers: Headers;
    userId: string;
    url: string
    constructor(private http: HttpClient) {
        this.userId = "1"
        //     this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //"http://35.203.181.89:300/meccapan/api/"
        this.url = "http://localhost:54187/meccapan/api/"
    }


    postLoginFacebook(form): Observable<any> {
        return this.http.post(this.url + 'loginFB', form, {
            headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        })
    }
      
    postLoginGoogle(form): Observable<any> {
        return this.http.post(this.url + 'loginGoogle', form, {
            headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        })
    }

    postLoginMeccapan(form): Observable<any> {
        return this.http.post(this.url + 'loginMeccapan', form, {
            headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        })
    }
}