import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { NgxPaginationModule } from 'ngx-pagination';
//Servicios
import { UsuarioService } from './servicios/usuarios/usuario.service';

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';

import {HttpClientModule} from '@angular/common/http';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
import { MenuComponent } from './componentes/menu/menu.component';

import { FormsModule } from '@angular/forms';
import { EnlaceMascotaComponent } from './componentes/enlace-mascota/enlace-mascota.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { VeterinarioComponent } from './componentes/veterinario/veterinario.component';

import {UsuarioPHPService } from './servicios/usuariosPHP/usuario-php.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerTotalCitasComponent } from './componentes/citas/ver-total-citas/ver-total-citas.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    InicioSesionComponent,
    RegistrateComponent,
    VerificacionCorreoComponent,
    PantallaPrincipalComponent,
    ConfiguracionUsuarioComponent,
    MenuComponent,
    EnlaceMascotaComponent,
    CitasComponent,
    VeterinarioComponent,
    RegistroComponent,
    VerTotalCitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatStepperModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [
    UsuarioService,
    UsuarioPHPService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
