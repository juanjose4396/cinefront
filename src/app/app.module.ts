import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard.service';
import {AuthGuardInverse} from './services/authInverseGuard.service';

const routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardInverse]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [AuthService, AuthGuard, AuthGuardInverse],
  bootstrap: [AppComponent]
})
export class AppModule { }
