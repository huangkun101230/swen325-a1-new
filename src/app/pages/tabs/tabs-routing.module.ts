import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AuthGuard } from "src/app/services/user/auth.guard";

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
        canActivate: [AuthGuard],
      },
      {
        path: "tab3",
        loadChildren: "../tab3-profile/tab3.module#Tab3PageModule",
        canActivate: [AuthGuard],
      },
      {
        path: "tab2/detail/:id",
        loadChildren:
          "../event-detail/event-detail.module#EventDetailPageModule",
        canActivate: [AuthGuard],
      },
      {
        path: "tab3/login",
        loadChildren: "../login/login.module#LoginPageModule",
      },
      {
        path: "tab3/reset-password",
        loadChildren: "../reset-password/reset-password.module#ResetPasswordPageModule",
      },
      {
        path: "tab3/signup",
        loadChildren: "../signup/signup.module#SignupPageModule",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/tab2",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
