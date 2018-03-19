import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { DashComponent } from './dash/dash.component';
import { DevicesComponent, DeviceNewDialog } from './devices/devices.component';
import { DevicesService } from './devices/devices.service';
import { ProfileComponent } from './profile/profile.component';
import { MonetizationComponent } from './monetization/monetization.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main.component';
import { RegisterComponent } from './register/register.component';
import { UtilService } from './util.service';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    DevicesComponent,
    DeviceNewDialog,
    ProfileComponent,
    MonetizationComponent,
    AuthComponent,
    MainComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GridsterModule
  ],
  entryComponents: [AppComponent, DeviceNewDialog],
  providers: [AuthService, DevicesService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
