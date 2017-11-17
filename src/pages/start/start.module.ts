import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPage } from './start';
import {SignInPageModule} from '../sign-in/sign-in.module';

@NgModule({
  declarations: [
    StartPage,
  ],
  imports: [
    SignInPageModule,
    IonicPageModule.forChild(StartPage),
  ],
})
export class StartPageModule {}
