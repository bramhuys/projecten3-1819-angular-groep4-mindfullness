import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OefeningComponent } from './oefening/oefening.component';
import { SessieComponent } from './sessie/sessie.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OefeningenLijstComponent } from './oefeningen-lijst/oefeningen-lijst.component';
import { SessieLijstComponent } from './sessie-lijst/sessie-lijst.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BerichtenComponent } from './berichten/berichten.component';
import { SessieoverzichtComponent } from './sessieoverzicht/sessieoverzicht.component';
import { KlantComponent } from './klant/klant.component';
import { KlantenLijstComponent } from './klanten-lijst/klanten-lijst.component';
import { HomeComponent } from './home/home.component';
import { OefeningOverzichtComponent } from './oefening-overzicht/oefening-overzicht.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { RegistrerenComponent } from './registreren/registreren.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

export const firebaseConfig = {
  apiKey: "AIzaSyB1wU05Yb-p-0hu98hq2agU2dk_7XHF7Zo",
  authDomain: "projecten3-angular.firebaseapp.com",
  databaseURL: "https://projecten3-angular.firebaseio.com",
  projectId: "projecten3-angular",
  storageBucket: "projecten3-angular.appspot.com",
  messagingSenderId: "378320525386"

};



const appRoutes: Routes = [

  { path: '', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'berichten', canActivate: [AuthGuardService], component: BerichtenComponent },
  { path: 'sessieoverzicht', canActivate: [AuthGuardService], component: SessieoverzichtComponent },
  { path: 'klanten', canActivate: [AuthGuardService], component: KlantenLijstComponent},
  { path: 'oefeningen', canActivate: [AuthGuardService], component: OefeningOverzichtComponent },
  { path: 'oefeningenlijst', component: OefeningenLijstComponent },
  { path: 'registreren', canActivate: [AuthGuardService], component: RegistrerenComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', canActivate: [AuthGuardService], component: PagenotfoundComponent }
  

];

@NgModule({
  declarations: [
    AppComponent,
    OefeningComponent,
    SessieComponent,
    MainNavComponent,
    OefeningenLijstComponent,
    SessieLijstComponent,
    PagenotfoundComponent,
    BerichtenComponent,
    SessieoverzichtComponent,
    KlantComponent,
    KlantenLijstComponent,
    HomeComponent,
    OefeningOverzichtComponent,
    LoginComponent,
    EmailComponent,
    RegistrerenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
