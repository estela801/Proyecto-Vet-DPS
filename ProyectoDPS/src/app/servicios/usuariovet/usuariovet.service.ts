import { Injectable, NgZone } from '@angular/core';

import { Usuario } from '../../modelos/usuarios/usuario';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariovetService {

  usuarioDatos: any;
  constructor(
    public afs : AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(usuario => {
      if (usuario) {
        this.usuarioDatos= usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioDatos));
        JSON.parse(localStorage.getItem('usuario'));
      } else {
        localStorage.setItem('usuario', null);
        JSON.parse(localStorage.getItem('usuario'));
      }
    })
  }

  

  SetUsuarioDatos(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  //registro con correo y contraseña
  registrate(correo, contrasena){
    return this.afAuth.createUserWithEmailAndPassword(correo, contrasena)
      .then((result) => {
       
        this.SetUsuarioDatos(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

 

 
}
