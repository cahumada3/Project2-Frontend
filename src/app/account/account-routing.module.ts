import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DeviceCreateComponent } from '../device/device-create/device-create.component';


const routes: Routes = [
    { path: 'account', component: AccountComponent },
    { path: 'account/create', component: DeviceCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
