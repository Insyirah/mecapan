import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetTimeAppointmentPage } from './set-time-appointment';

@NgModule({
  declarations: [
    SetTimeAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SetTimeAppointmentPage),
  ],
})
export class SetTimeAppointmentPageModule {}
