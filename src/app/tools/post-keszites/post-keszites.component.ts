import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import {FirebaseTSStorage} from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-post-keszites',
  templateUrl: './post-keszites.component.html',
  styleUrls: ['./post-keszites.component.css']
})
export class PostKeszitesComponent{

  constructor(private dialog: MatDialogRef<PostKeszitesComponent>){}

  kivalasztottKep: File | undefined;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();

  photoSelected(photoSelector: HTMLInputElement){
    if(photoSelector != null){
      this.kivalasztottKep = photoSelector.files![0];
      if(this.kivalasztottKep==null) return;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.kivalasztottKep);
      fileReader.addEventListener(
        "loadend",
        ev =>{
          if(fileReader.result != null){
            let olvashatoSzoveg = fileReader.result.toString();
            let keplathatosag = <HTMLImageElement>document.getElementById("post-preview-image");
            keplathatosag.src = olvashatoSzoveg;
          }
        }
      );
    }
  }

  kepFeltoltesPost(leirasa: string){
    const currentUser = this.auth.getAuth().currentUser;
    if(currentUser != null){
      let postId = this.firestore.genDocId();
      this.storage.upload({
        uploadName: "kep feltoltes Post",
        path: ["Postok", postId, "kep"],
        data: {
          data: this.kivalasztottKep
        },
        onComplete: (url) => {
          this.firestore.create({
            path: ["Postok", postId],
            data: {
              leiras: leirasa,
              keszitoId: currentUser.uid,
              kepUrl: url,
            },
            onComplete: (docId) => {
              this.dialog.close();
            }
          } 
        )
      }
    }
    );
  }
  }

  postFeltoltes(leirasa: string){
    const currentUser = this.auth.getAuth().currentUser;
    if(currentUser != null){
    this.firestore.create({
      path: ["Postok"],
      data: {
        leiras: leirasa,
        keszitoId: currentUser.uid,
      },
      onComplete: (docId) => {
        this.dialog.close();
      }
    } 
    )
  }
}

  onKozzetetel(leiras: HTMLTextAreaElement){
    const currentUser = this.auth.getAuth().currentUser;
    let leirasa = leiras.value;
    if(leirasa.length <=0) return;
    if(this.kivalasztottKep){
      this.kepFeltoltesPost(leirasa);
    } else {
      this.postFeltoltes(leirasa);
    }
  }

}
