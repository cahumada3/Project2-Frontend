import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular'

import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [MsalGuard]},
  { path: 'account', component: AccountComponent, canActivate: [MsalGuard]},
  { path: 'device/create', component: DeviceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
