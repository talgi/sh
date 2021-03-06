import { Routes } from '@angular/router';
import { AppComponent } from './app.component'

import { SignInComponent } from '../fw/users/sign-in/sign-in.component';
import { RegisterUserComponent } from '../fw/users/register-user/register-user.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';

//Dashboards
import { WelcomeDashboardComponent } from './dashboards/welcome-dashboard/welcome-dashboard.component';
import { AboutDashboardComponent } from './dashboards/about-dashboard/about-dashboard.component';
import { RoomsDashboardComponent } from './dashboards/rooms-dashboard/rooms-dashboard.component';
import { RoomCanvasDashboardComponent }  from './dashboards/room-canvas-dashboard/room-canvas-dashboard.component';
import { ProposalDashboardComponent} from './dashboards/proposal-dashboard/proposal-dashboard.component';
//import { RoomBlueprintCanvasComponent } from './dashboards/room-blueprint-canvas/room-blueprint-canvas.component';
/*import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryMaintComponent } from './country-maint/country-maint.component';
import { SettingsComponent } from './settings/settings.component';


import { AuthGuard } from './services/auth-guard.service';*/

export const appRoutes: Routes = [
  /*{ path: 'canvas', component: RoomBlueprintCanvasComponent },*/
  { path: 'signin', component: SignInComponent},
  { path: 'register', component: RegisterUserComponent},
  {  path: '', component: AuthenticatedUserComponent,
    children: [
      { path: 'welcome', component: WelcomeDashboardComponent },
      { path:'about', component: AboutDashboardComponent},
      { path:'contactinfo', component: AboutDashboardComponent},
      { path: 'rooms', component: RoomsDashboardComponent },
      { path: 'proposal', component: ProposalDashboardComponent },
      { path: 'canvas', component: RoomCanvasDashboardComponent/*RoomCanvasComponent*/ },
      { path: '**', component: WelcomeDashboardComponent },
    ]
  },
];