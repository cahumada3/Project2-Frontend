import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalInterceptor, MsalModule, MsalGuard } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { msalConfig, guardConfig, b2cPolicies, isIE, interceptConfig } from './app-config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PublicClientApplication } from '@azure/msal-browser';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId:"12b471b2-cdab-402d-9eb9-30ccdef11f36",
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: "https://calm-beach-035463210.1.azurestaticapps.net/",
        postLogoutRedirectUri: "https://calm-beach-035463210.1.azurestaticapps.net/",
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,
      }
    }), guardConfig, interceptConfig),
    
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
