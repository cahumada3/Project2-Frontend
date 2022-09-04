import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalInterceptor, MsalModule, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { msalConfig, b2cPolicies, isIE} from './app-config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
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
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId:"e02f8023-5e22-43fa-a50c-f89a0ed37f5d",
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: "https://calm-beach-035463210.1.azurestaticapps.net/",
        postLogoutRedirectUri: "https://calm-beach-035463210.1.azurestaticapps.net/",
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,
      },
    }),
    {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })      
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
