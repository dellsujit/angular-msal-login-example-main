import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService) {}
  token:string;
  async getToken(): Promise<string> {
    return this.msalService.acquireTokenSilent({
      scopes: ['openid profile']
    }).toPromise().then((response) => {
      alert(response.accessToken);
      return response.accessToken;
    }).catch((error) => {
      console.error('Failed to acquire token:', error);
      return '';
    });
  }

 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const token = this.msalService.instance.getActiveAccount;
    // const accessTokenRequest = 
    // {
    //   scopes: ["openid profile"],
    //   account: this.msalService.instance.getAllAccounts()[0],
    // };
    // this.msalService.acquireTokenSilent(accessTokenRequest).subscribe((accessTokenReponse) => {
    //   if(accessTokenReponse != null)
    //    {
    //     let accessToken = accessTokenReponse.accessToken;
    //     this.token = accessToken;
    //     console.log("We got the token! hahaha: " + accessToken);
    //   }
    // })
     
   

    if (this.token) 
    {
      this.token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.token}`)
      });
      console.log(authReq,"authreq");
      return next.handle(authReq);
    } else 
    {
      return next.handle(req);
    }
  }
}
