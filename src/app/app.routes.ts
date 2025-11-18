import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { MatchesComponent } from "./layout/matches/matches.component";
import { SettingsComponent } from "./layout/settings.component";
import { ActiveMatchesComponent } from "./layout/active-matches/active-matches.component";
import { ChangeSettingsComponent } from "./layout/change-settings/change-settings.component";
import { AllSports } from "./layout/all-sports/all-sports";
import { Whitelisting } from "./layout/whitelisting/whitelisting";
import { Iframe } from "./layout/iframe/iframe";
import { ScoreNotFound } from "./layout/score-not-found/score-not-found";
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
      { path: "active-matches", component: ActiveMatchesComponent },
      { path: "change-settings", component: ChangeSettingsComponent },
      { path: "score-not-found", component: ScoreNotFound },
      { path: "iframe/:eventId", component: Iframe },

      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "" },
];
