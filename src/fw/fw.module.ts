import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';

import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { ContentComponent } from './content/content.component';
import { StatusBarComponent } from './bars/status-bar/status-bar.component';

import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { RegisterUserComponent } from './users/register-user/register-user.component';

//Services
import { FrameworkConfigService } from './services/framework-config.service';
import { MenuService } from './services/menu.service';

import { TopBarComponent } from './bars/top-bar/top-bar.component'
/*


;

import { ScreenService } from './services/screen.service';
import { ScreenLarge } from './directives/screen-large.directive';
import { ScreenBelowLarge } from './directives/screen-below-large.directive';


import { PopupMenuComponent } from './menus/popup-menu/popup-menu.component';


import { DynamicFormComponent } from './dynamic-forms/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './dynamic-forms/dynamic-field/dynamic-field.component';
*/
import { PanelComponent } from './panels/panel/panel.component';
import { WelcomePanelComponent } from './panels/welcome-panel/welcome-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    FrameworkBodyComponent,
    TitleBarComponent,
    ContentComponent,
    StatusBarComponent,
    MenuComponent,
    MenuItemComponent,
    SignInComponent,
    RegisterUserComponent,
    TopBarComponent,
    StatusBarComponent,
    /*
 
    StatusBarComponent,
    ScreenLarge,
    ScreenBelowLarge,

    PopupMenuComponent,
  
   
    DynamicFormComponent,
    DynamicFieldComponent,
    */
    WelcomePanelComponent,
    PanelComponent
  ],
  providers: [
    FrameworkConfigService,
    /*ScreenService,*/
    MenuService
  ],
  exports: [
    FrameworkBodyComponent,
    PanelComponent,
    WelcomePanelComponent,
    /*DynamicFormComponent,
    ScreenLarge,
    ScreenBelowLarge*/
  ]
})
export class FwModule { }
