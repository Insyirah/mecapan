import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetDayAppointmentPage } from './set-day-appointment';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    SetDayAppointmentPage
  ],
  imports: [
    IonicPageModule.forChild(SetDayAppointmentPage),
    NgCalendarModule,
    CalendarModule
  ],
  exports:[
    SetDayAppointmentPage
  ]
})
export class SetDayAppointmentPageModule {}
