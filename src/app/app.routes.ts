import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { MatchesComponent } from "./layout/matches/matches.component";
import { SettingsComponent } from "./layout/settings.component";
import { AllSports } from "./layout/all-sports/all-sports";
import { Whitelisting } from "./layout/whitelisting/whitelisting";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "app",
    component: LayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "matches", component: MatchesComponent },
      { path: "settings", component: SettingsComponent },
      { path: "all-sports", component: AllSports },
      { path: "white-listing", component: Whitelisting },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "" },
];
