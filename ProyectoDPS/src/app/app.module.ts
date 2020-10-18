import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { CitaComponent } from './componentes/citas/cita/cita.component';

import { CitaService } from './services/cita.service';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    InicioSesionComponent,
    RegistrateComponent,
    VerificacionCorreoComponent,
    CitaComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CitaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



}
