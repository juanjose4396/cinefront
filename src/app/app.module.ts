import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {PeliculasComponent} from './peliculas/peliculas.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard.service';
import {AuthGuardInverse} from './services/authInverseGuard.service';
import {APIService} from './services/api.service';
import {DetalleComponent} from './detalle/detalle.component';
import { ComprarComponent } from './comprar/comprar.component';
import {ResaltarClickDirective} from './directives/resaltar-click.directive';
import {DetalleVentaComponent} from './detalle_venta/detalle_venta.component';
import {VentasComponent} from './ventas/venta.component';
import {AdministradorGuard} from './services/administradorGuard.service';
import { PerfilComponent } from './perfil/perfil.component';
import {TaquillaGuard} from './services/taquillaGuard.service';

const routes = [
    {path: '', component: LoginComponent, canActivate: [AuthGuardInverse]},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardInverse]},
    {path: 'peliculas', component: PeliculasComponent, canActivate: [AuthGuard]},
    {path: 'pelicula/:id', component: DetalleComponent, canActivate: [AuthGuard, TaquillaGuard]},
    {path: 'comprar/boletas/sillas', component: ComprarComponent, canActivate: [AuthGuard, TaquillaGuard]},
    {path: 'pelicula/detalle/venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard]},
    {path: 'detalle/ventas', component: VentasComponent, canActivate: [AuthGuard, AdministradorGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]}];

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    LoginComponent,
    DetalleComponent,
    ComprarComponent,
    ResaltarClickDirective,
    DetalleVentaComponent,
    VentasComponent,
    PerfilComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [AuthService, APIService, AuthGuard, AuthGuardInverse, AdministradorGuard, TaquillaGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
