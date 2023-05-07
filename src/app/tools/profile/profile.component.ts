import { Component, Input } from '@angular/core';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import {FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore'
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;
  @Input() mutassa: boolean = false;

  constructor(){
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
  }

  folytatas(nev: HTMLInputElement, leiras:HTMLTextAreaElement){
    let neve = nev.value;
    let leirasa= leiras.value;
    const currentUser = this.auth.getAuth().currentUser;
    if (currentUser != null) {
        this.firestore.create(
          {
            path: ["Felhasznalok", currentUser.uid],
            data: {
              publicName: neve,
              description: leirasa
            },
            onComplete: (id) => {
              alert("Profil létrehozva!")
              nev.value = "";
              leiras.value = "";
            },
            onFail: (err) => {
              alert("Sikertelen profil kreálás!")
            }
        }
        );
    } else {
        alert("Kérjük, töltse ki mindkét mezőt!");
    }
  }
}
