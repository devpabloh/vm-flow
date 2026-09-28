import {PublicClientApplication, EventType, type AuthenticationResult, type Configuration} from '@azure/msal-browser';

const config: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
        redirectUri: `${window.location.origin}`,
        postLogoutRedirectUri: window.location.origin
    },
    cache: {cacheLocation: 'sessionStorage'}
}

export const msalInstance = new PublicClientApplication(config);

msalInstance.addEventCallback((event)=> {
    if(event.eventType === EventType.LOGIN_SUCCESS && event.payload){
        msalInstance.setActiveAccount((event.payload as AuthenticationResult).account)
    }
})

export const loginRequest = {scopes: ['User.Read']}