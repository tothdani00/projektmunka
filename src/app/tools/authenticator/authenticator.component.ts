import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import{MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {
  statusz="login";
  firebaseAuth: FirebaseTSAuth;

  constructor(private bottomSheet: MatBottomSheet){
    this.firebaseAuth = new FirebaseTSAuth();
  }


  Regisztralashoz(registerEmail: HTMLInputElement, registerJelszo: HTMLInputElement, registerJelszoUjra: HTMLInputElement
  ){
    let email = registerEmail.value;
    let jelszo = registerJelszo.value;
    let jelszoUjra = registerJelszoUjra.value;

    if(email!=null && email.length>0 && jelszo!=null && jelszo.length>0 && jelszoUjra!=null && jelszoUjra.length>0 && jelszo == jelszoUjra){
      this.firebaseAuth.createAccountWith(
        {
          email: email,
          password: jelszo,
          onComplete: (uc) => {
            alert("Sikeres regisztráció!")
            registerEmail.value = "";
            registerJelszo.value = "";
            registerJelszoUjra.value = "";
            this.bottomSheet.dismiss();
          },
          onFail: (err) => {
            alert("Nem sikerült fiókot csinálni.")
          }
        }
      );
    }
   
  }

  Bejelentkezeshez(loginEmail:HTMLInputElement, loginJelszo: HTMLInputElement){
    let email = loginEmail.value;
    let jelszo = loginJelszo.value;
    if(email!=null && email.length>0 && jelszo!= null && jelszo.length>0){
      this.firebaseAuth.signInWith(
        {
          email: email,
          password: jelszo,
          onComplete: (uc) => {
            alert("Sikeres bejelentkezés!")
            this.bottomSheet.dismiss();
          },
          onFail: (err) => {
            alert("Sikertelen bejelentkezés!")
          }
        }
      );
    }
  }

  onRegister(){
    this.statusz = 'register';
  }

  onLogin(){
    this.statusz = 'login';
  }

  isLogin(): boolean {
    return this.statusz === 'login';
  }
  
  isRegister(): boolean {
    return this.statusz === 'register';
  }

  headerValtoztatas(): string {
    switch (this.statusz) {
      case 'login':
        return 'Bejelentkezés';
      case 'register':
        return 'Regisztráció';
      default:
        return '';
    }
  }
}