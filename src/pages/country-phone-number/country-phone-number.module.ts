import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountryPhoneNumberPage } from './country-phone-number';

@NgModule({
  declarations: [
    CountryPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(CountryPhoneNumberPage),
  ],
})
export class CountryPhoneNumberPageModule {}
