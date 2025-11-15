import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { MatchesComponent } from './layout/matches/matches.component';
import { SettingsComponent } from './layout/settings.component';
import { ActiveMatchesComponent } from './layout/active-matches/active-matches.component';
import { ChangeSettingsComponent } from './layout/change-settings/change-settings.component'; 
export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'active-matches', component: ActiveMatchesComponent },
      { path: 'change-settings', component: ChangeSettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
