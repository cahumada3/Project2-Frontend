import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';


import { DeviceRoutingModule } from './device-routing.module';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceCreateComponent } from './device-create/device-create.component';


@NgModule({
  declarations: [
    DeviceEditComponent,
    DeviceCreateComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ReactiveFormsModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
