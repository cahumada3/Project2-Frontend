import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { Configuration } from 'msal';


export const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_TeleCom-App"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://telecomb2c.b2clogin.com/telecomb2c.onmicrosoft.com/B2C_1_TeleCom-App"
        }       
    }
}

export const apiConfig: { b2cScopes: string[], apiEndpoint: string } = {
    b2cScopes: ["https://telecomb2c.onmicrosoft.com/tele-com-api/api.read"],
    apiEndpoint: "https://telecomb2c.onmicrosoft.com/tele-com-api/api"
}

export const msalConfig: Configuration = {
    auth: {
        clientId:"12b471b2-cdab-402d-9eb9-30ccdef11f36",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: false,
        validateAuthority: true,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,
    },
}

export const loginRequest: { scopes: string[] } = {
    scopes: ["openid", "profile"]
}

export const tokenRequest: { scopes: string[] } = {
    scopes: apiConfig.b2cScopes
}

export const protectedResourcesMap: [string, string[]][] = [
    [apiConfig.apiEndpoint, apiConfig.b2cScopes]
];

export const msalAngularConfig: {} = {
    popUp: !isIE,
    consentScopes: [
        ...loginRequest.scopes,
        ...tokenRequest.scopes,
    ],
    unprotectedResources: [],
    protectedResourcesMap,
    extraQueryParameters: {}
}

export const guardConfig: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect
}

export const interceptConfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ])
}