import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { AddDeviceComponent } from './add-device/add-device.component';


@NgModule({
  declarations: [
  
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
