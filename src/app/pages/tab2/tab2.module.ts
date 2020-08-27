import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Tab2PageRoutingModule } from "./tab2-routing.module";

import { Tab2Page } from "./tab2.page";

import { NgCircleProgressModule } from 'ng-circle-progress';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [Tab2Page],
  exports: [],
  providers: [LocalNotifications]
})
export class Tab2PageModule {}
