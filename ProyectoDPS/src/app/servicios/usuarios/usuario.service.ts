import { Injectable , NgZone} from '@angular/core';

import { Usuario } from '../../modelos/usuarios/usuario';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

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
    this.usuarioDatos$ = afAuth.authState.pipe(
      switchMap((usuario) => {
        if(usuario){
          return this.afs.doc<Usuario>(`users/${usuario.uid}`).valueChanges();
        } else{
        return of(null);}
      })
    );
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
  async loginGoogle(): Promise<Usuario> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async correoVerificacion(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<Usuario> {
    try {
      console.log(email);
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
      
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  
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

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  public updateUserData(user: Usuario) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: Usuario = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL

    };
    return userRef.set(data, { merge: true });
}

}
