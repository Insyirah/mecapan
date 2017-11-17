import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListprovidersPage } from './listproviders';
import {NguiMapModule} from '@ngui/map';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

@NgModule({
  declarations: [
    ListprovidersPage,
  ],
  imports: [
    NguiMapModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(ListprovidersPage),
  ],
})
export class ListprovidersPageModule {}
