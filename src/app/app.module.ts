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
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId:"e02f8023-5e22-43fa-a50c-f89a0ed37f5d",
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: "http://localhost:4200",
        postLogoutRedirectUri: "http://localhost:4200",
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
