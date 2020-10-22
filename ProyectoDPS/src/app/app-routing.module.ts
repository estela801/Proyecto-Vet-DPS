import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
<<<<<<< HEAD
import { RegistroComponent } from './componentes/registro/registro.component';
=======
import { CitasComponent } from './componentes/citas/citas.component'
import { VeterinarioComponent } from './componentes/veterinario/veterinario.component';

import { EnlaceMascotaComponent } from './componentes/enlace-mascota/enlace-mascota.component';
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe

const routes: Routes = [
  {path:'', redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio', component: IndexComponent},
  {path:'inicio-sesion', component: InicioSesionComponent},
  {path:'registrate', component: RegistrateComponent},
  {path:'verificacion-correo', component: VerificacionCorreoComponent},
  {path:'pantalla-principal', component: PantallaPrincipalComponent},
  {path:'configuracion-usuario', component: ConfiguracionUsuarioComponent},
<<<<<<< HEAD
  {path:'registro', component: RegistroComponent}

=======
  {path:'citas-creacion', component: CitasComponent},
  {path:'veterinario', component:VeterinarioComponent},
  {path:'enlace-mascota', component: EnlaceMascotaComponent}
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
