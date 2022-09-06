import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular'

import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AddDeviceComponent } from './account/add-device/add-device.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [MsalGuard]},
  { path: 'account', component: AccountComponent, canActivate: [MsalGuard]},
  { path: 'account/addDevice', component: AddDeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
