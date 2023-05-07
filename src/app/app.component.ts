import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bejelentkezett: boolean = false;
  vanProfilja:boolean = true;
  userdok: userDok | undefined;

  auth= new FirebaseTSAuth;
  firestore = new FirebaseTSFirestore;
  constructor(private loginSheet: MatBottomSheet, private router: Router){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState({
          whenSignedIn: user => {
            this.bejelentkezett = true;
            this.profilLekeres();
          },
          whenSignedOut: user => {
            this.bejelentkezett = false;
          }
        })
      }
    );
    
  }

  profilLekeres(): Promise<boolean> {
    const currentUser = this.auth.getAuth().currentUser;
    if (currentUser == null) {
      return Promise.resolve(false); 
    } else {
      return new Promise<boolean>((resolve, reject) => {
        this.firestore.listenToDocument({
          name: 'Dokumentum lekerese',
          path: ['Felhasznalok', currentUser.uid],
          onUpdate: (snapshot) => {
            const data = snapshot.data() as userDok | undefined;
            const vanProfil = snapshot.exists;
            this.vanProfilja = vanProfil;
            if (vanProfil && data) {
              this.userdok = data;
              this.router.navigate(["posts"]);
            } else {
              this.userdok = undefined;
              resolve(false);
            }
            resolve(vanProfil);
          },
        });
      });
    }
  }


  bejelentkezettE() {
    if(this.auth.isSignedIn() == true){
      return this.bejelentkezett=true;
    } else {
      return this.bejelentkezett=false;
    }
    
  }

  onLogout(){
    if(this.bejelentkezett==true){
      this.auth.signOut();
    }
  }
  onLogin(){
    this.loginSheet.open(AuthenticatorComponent);
  }

}

export interface userDok {
  publicName: string;
  description: string;
}