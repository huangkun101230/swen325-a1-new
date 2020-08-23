import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        loadChildren: "../tab1-calendar/tab1.module#Tab1PageModule",
      },
      {
        path: "tab2",
        loadChildren: "../tab2-eventList/tab2.module#Tab2PageModule",
      },
      {
        path: "tab3",
        loadChildren: "../tab3-profile/tab3.module#Tab3PageModule",
      },
      // {
      //   path: "tab3/login",
      //   loadChildren: "../login/login.module#LoginPageModule",
      // },
      {
        path: "tab2/detail",
        loadChildren: "../event-detail/event-detail.module#EventDetailPageModule",
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
