import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FwModule } from '../fw/fw.module';

import { AppComponent } from './app.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';


import { appRoutes } from './app.routing';
import { WelcomeDashboardComponent } from './dashboards/welcome-dashboard/welcome-dashboard.component';
import { RoomsDashboardComponent } from './dashboards/rooms-dashboard/rooms-dashboard.component';
import { AboutDashboardComponent } from './dashboards/about-dashboard/about-dashboard.component';
import { ProposalDashboardComponent } from './dashboards/proposal-dashboard/proposal-dashboard.component';
import { RoomCanvasDashboardComponent } from './dashboards/room-canvas-dashboard/room-canvas-dashboard.component';
import { RoomCanvasComponent } from './canvases/room-canvas/room-canvas.component';
import { ProposalCanvasComponent } from './canvases/proposal-canvas/proposal-canvas.component';
//import { RoomBlueprintCanvasComponent } from './dashboards/room-blueprint-canvas/room-blueprint-canvas.component';
/*import { CountryListComponent } from './country-list/country-list.component';*/
import { RoomListComponent } from './room-list/room-list.component';
import { ItemListComponent } from './items/item-list/item-list.component';

import { UserService } from './services/user.service';
import { UserApi } from '../fw/users/user-api';
/*import { SettingsComponent } from './settings/settings.component';

import { CountryDetailComponent } from './country-detail/country-detail.component';

import { CountryMaintComponent } from './country-maint/country-maint.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';

import { AuthGuard } from './services/auth-guard.service';

*/
import { AppDataService } from './services/app-data.service';
/*import { CountryPanelComponent } from './panels/country-panel/country-panel.component';*/
import { RoomPanelComponent } from './panels/room-panel/room-panel.component';
import { QuestionPanelComponent } from './panels/question-panel/question-panel.component';
import { ItemBuyPanelComponent } from './panels/item-buy-panel/item-buy-panel.component';
import { ImagePanelComponent } from './panels/image-panel/image-panel.component';
import { WelcomePanelComponent } from './panels/welcome-panel/welcome-panel.component';
import { AboutPanelComponent } from './panels/about-panel/about-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedUserComponent,
    WelcomeDashboardComponent,
    AboutDashboardComponent,

    ProposalCanvasComponent,
    RoomCanvasComponent,

    RoomsDashboardComponent,
    RoomCanvasDashboardComponent,
    ProposalDashboardComponent,

    //RoomBlueprintCanvasComponent,


    /*SettingsComponent,
    CountryDetailComponent,
    CountryMaintComponent,
    CountryListComponent,
    ,
    /* CountryPanelComponent,*/
    RoomPanelComponent,
    QuestionPanelComponent,
    ItemBuyPanelComponent,
    WelcomePanelComponent,
    AboutPanelComponent,
    ImagePanelComponent,

    RoomListComponent,
    ItemListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FwModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    { provide: UserApi, useExisting: UserService },
    /* AuthGuard,*/
    AppDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
