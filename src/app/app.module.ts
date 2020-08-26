import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // BrowserAnimationsModule,
    // MatProgressSpinnerModule,
    // NgCircleProgressModule.forRoot({})
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
