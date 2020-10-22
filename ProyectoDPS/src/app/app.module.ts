import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
//Servicios
import { UsuarioService } from './servicios/usuarios/usuario.service';

<<<<<<< HEAD
//Servicios
import { UsuarioService } from './servicios/usuarios/usuario.service';

=======
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';

import {HttpClientModule} from '@angular/common/http';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
<<<<<<< HEAD

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

=======
import { MenuComponent } from './componentes/menu/menu.component';

import { FormsModule } from '@angular/forms';
import { EnlaceMascotaComponent } from './componentes/enlace-mascota/enlace-mascota.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { VeterinarioComponent } from './componentes/veterinario/veterinario.component';

import {UsuarioPHPService } from './servicios/usuariosPHP/usuario-php.service';
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    InicioSesionComponent,
    RegistrateComponent,
    VerificacionCorreoComponent,
    PantallaPrincipalComponent,
    ConfiguracionUsuarioComponent,
<<<<<<< HEAD
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
=======
    MenuComponent,
    EnlaceMascotaComponent,
    CitasComponent,
    VeterinarioComponent
  ],
  imports: [
    BrowserModule,
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
<<<<<<< HEAD
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    UsuarioService
=======
    FormsModule
  ],
  providers: [
    UsuarioService,
    UsuarioPHPService
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
