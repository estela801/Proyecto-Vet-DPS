import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { VerificacionCorreoComponent } from './componentes/verificacion-correo/verificacion-correo.component';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio', component: IndexComponent},
  {path:'inicio-sesion', component: InicioSesionComponent},
  {path:'registrate', component: RegistrateComponent},
  {path:'verificacion-correo', component: VerificacionCorreoComponent},
  {path:'pantalla-principal', component: PantallaPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
