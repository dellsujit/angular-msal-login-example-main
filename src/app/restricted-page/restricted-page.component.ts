import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit {
  profile:any;

  constructor(private authService: MsalService, private http: HttpClient) { }

  public token;
  getName () : string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }
    //console.log(this.authService.instance.acquireTokenSilent);
    return this.authService.instance.getActiveAccount().name

  }
  //  acquireToken() {
  //   const accessTokenRequest = 
  //   {
  //     scopes: ["openid profile"],
  //     account: this.authService.instance.getAllAccounts()[0],
  //   };
    
    
  //   this.authService.acquireTokenSilent(accessTokenRequest).subscribe( (accessTokenReponse) => {
  //     if(accessTokenReponse != null) {
  //       // Acquire token silent success
  //       let accessToken = accessTokenReponse.accessToken;
  //       this.token = accessToken;
  //       // Call your API with token
  //       console.log("We got the token! hahaha: " + accessToken);
  //     }
  //   })
  // }

  getProfile()
  {
    debugger;
  //   this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
  //     this.totalAngularPackages = data.total;
  // })
    debugger;
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
      
  }
  // getToken(): Promise<string> {
  //   return this.authService.acquireTokenSilent({
  //     scopes: ['openid profile']
  //   }).toPromise().then((response) => {
  //     alert(response.accessToken);
  //     return response.accessToken;
  //   }).catch((error) => {
  //     console.error('Failed to acquire token:', error);
  //     return '';
  //   });
  // }


  ngOnInit(): void {
    this.getProfile();
    //this.getToken();
    // this.acquireToken();
    //  let a =this.fetchGrapapi();
    //  console.log(a);
    //alert();
    // console.log(this.authService.acquireTokenSilent)
    
    // const request = {
    //   scopes: ['user.read'],
    // };
    
    //  function getToken() {
    //   try {
    //     const account = this.authService.getAllAccounts()[0]; // Assuming there is only one account
    //     if (!account) {
    //       throw new Error('No accounts found');
    //     }
    //     const silentRequest = {
    //       account: account,
    //       scopes: request.scopes,
    //     };
    //     const response = await this.authService.acquireTokenSilent(silentRequest);
    //     return response.accessToken;
    //   } catch (error) {
    //     console.error('Silent token acquisition failed', error);
    //     return null;
    //   }
    // }
    
    // // Example usage
    // getToken().then((token) => {
    //   if (token) {
    //     console.log('Access token:', token);
    //   }
    // })
  }

  

}
