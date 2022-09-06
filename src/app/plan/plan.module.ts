import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { AddDeviceComponent } from './add-device/add-device.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
  ]
})
export class PlanModule { }
