import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import {GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashComponent } from './dash/dash.component';
import { DevicesComponent } from './devices/devices.component';



@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    DevicesComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
