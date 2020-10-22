import { Injectable, NgZone } from '@angular/core';

import { Usuario } from '../../modelos/usuarios/usuario';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariovetService{

 // usuarioDatos: any;
 public usuarioDatos$: Observable<Usuario>;
  constructor(
    public afs : AngularFirestore,
    public afAuth: AngularFireAuth,
    /*public router: Router,
    public ngZone: NgZone*/
  ) {  
    /*this.afAuth.authState.subscribe(usuario => {
      if (usuario) {
        this.usuarioDatos= usuario;
        localStorage.setItem('user', JSON.stringify(this.usuarioDatos));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })*/
   
  }

  /*get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : true;
  }
  //Inicio de sesión con Correo y Contraseña
  inicioSesion(correo, contrasena){
    return this.afAuth.signInWithEmailAndPassword(correo, contrasena).then((result) => {
      if(result.user.emailVerified && result){
        this.SetUsuarioDatos(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['pantalla-principal']);
        });
        //this.SetUsuarioDatos(result.user);
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Correo :'+result.user.email+' no verificado!'
        })
      }
    }).catch((error) => {
       window.alert(error.message)
    })
  }

  SetUsuarioDatos(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const usuarioDatos: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }
    return userRef.set(usuarioDatos, {
      merge: true
    })
  }

  //registro con correo y contraseña
  registrate(correo, contrasena){
    return this.afAuth.createUserWithEmailAndPassword(correo, contrasena)
      .then((result) => {
        this.mandarVerificacion();
        this.SetUsuarioDatos(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  //Mandar correo de verificación
  mandarVerificacion(){
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
    this.router.navigate(['verificacion-correo']);
    })
  }

  authGoogle(){
    return this.AuthIniciarSesion(new auth.GoogleAuthProvider());
  }

  AuthIniciarSesion(provider){
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['pantalla-principal']);
        })
      this.SetUsuarioDatos(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  //Cerrar sesión
  cerrarSesion(){
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.router.navigate(['inicio-sesion']);
    })
  }*/
 

  async correoVerificacion(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }


  async registro(email: string, password: string): Promise<Usuario> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.correoVerificacion();
      return user;
    } catch (error) {
      window.alert(error);
    }
  }

 


}
