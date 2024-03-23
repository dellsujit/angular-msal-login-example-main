import { Injectable, InjectionToken, Inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as Msal from 'msal';

@Injectable()
export class MsalServices 
{
    constructor(private msalService: MsalService) {}

    token:string;
    async getToken(): Promise<string> {
      return this.msalService.acquireTokenSilent({
        scopes: ['openid profile']
      }).toPromise().then((response) => {
        return response.accessToken;
      }).catch((error) => {
        console.error('Failed to acquire token:', error);
        return '';
      });
    }
  
    public getTokenn(): {
        
        this.authService.acquireTokenSilent({
            scopes: ['your_scope_here']
          }).then((response) => {
            // Token acquired successfully
            console.log('Access token:', response.accessToken);
          }).catch((error) => {
            // Failed to acquire token, redirect to login
            this.authService.loginRedirect();
          });

}