import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {CustomHttpInterceptor} from '../auth/auth.intercept'
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '8639ec81-b47f-4696-84ee-aeda335c3e28',
      authority:
            "https://login.microsoftonline.com/516e848d-1ae9-4414-b36c-65260ec80967",
      redirectUri: 'https://localhost:4200'
    },
    cache: {
      cacheLocation: "localStorage",
      //storeAuthStateInCookie: isIE,
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    RestrictedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
