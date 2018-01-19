import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {PeliculasComponent} from './home/peliculas.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard.service';
import {AuthGuardInverse} from './services/authInverseGuard.service';
import {APIService} from './services/api.service';

const routes = [
    {path: '', component: LoginComponent, canActivate: [AuthGuardInverse]},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardInverse]},
    {path: 'peliculas', component: PeliculasComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [AuthService, APIService, AuthGuard, AuthGuardInverse],
  bootstrap: [AppComponent]
})
export class AppModule { }
