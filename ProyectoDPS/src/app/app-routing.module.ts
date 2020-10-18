import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio', component: IndexComponent},
  {path:'inicio-sesion', component: InicioSesionComponent},
  {path:'registrate', component: RegistrateComponent},
  {path:'verificacion-correo', component: VerificacionCorreoComponent},
  {path:'pantalla-principal', component: PantallaPrincipalComponent},
  {path:'configuracion-usuario', component: ConfiguracionUsuarioComponent},
  {path:'registro', component: RegistroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
