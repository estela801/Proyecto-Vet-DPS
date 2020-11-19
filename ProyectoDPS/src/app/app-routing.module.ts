import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
import { CitasComponent } from './componentes/citas/citas.component'
import { EnlaceMascotaComponent } from './componentes/enlace-mascota/enlace-mascota.component';
import { VeterinarioComponent } from './componentes/veterinario/veterinario.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VerTotalCitasComponent } from './componentes/citas/ver-total-citas/ver-total-citas.component'; 
import { VerTrabajadoresComponent } from './componentes/ver-trabajadores/ver-trabajadores.component';
import { VerMascotasComponent } from './componentes/ver-mascotas/ver-mascotas.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio', component: IndexComponent},
  {path:'inicio-sesion', component: InicioSesionComponent},
  {path:'registrate', component: RegistrateComponent},
  {path:'verificacion-correo', component: VerificacionCorreoComponent},
  {path:'pantalla-principal', component: PantallaPrincipalComponent},
  {path:'configuracion-usuario', component: ConfiguracionUsuarioComponent},
  {path:'citas-creacion', component: CitasComponent},
  {path:'veterinario', component:VeterinarioComponent},
  {path:'enlace-mascota', component: EnlaceMascotaComponent},
  {path:'registro', component:RegistroComponent},
  {path:'ver-citas', component:VerTotalCitasComponent},
  {path:'ver-trabajadores', component:VerTrabajadoresComponent},
  {path:'ver-mascotas', component:VerMascotasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
