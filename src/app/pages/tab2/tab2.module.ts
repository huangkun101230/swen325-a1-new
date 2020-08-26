import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Tab2PageRoutingModule } from "./tab2-routing.module";

import { Tab2Page } from "./tab2.page";

// import { MatProgressSpinner } from "@angular/material/progress-spinner";
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Tab2PageRoutingModule],
  declarations: [Tab2Page],
  exports: [],
})
export class Tab2PageModule {}
