import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/posts/posts.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-mutatas',
  templateUrl: './post-mutatas.component.html',
  styleUrls: ['./post-mutatas.component.css']
})
export class PostMutatasComponent implements OnInit{


  ngOnInit(): void {
    this.getkeszitoId();
  }


  @Input() postData: PostData | undefined;
  kreatorNeve = '';
  kreatorLeirasa = '';
  firestore = new FirebaseTSFirestore();

  getkeszitoId(){
    const keszito = this.postData?.keszitoId;
    if(keszito != null){
      this.firestore.getDocument(
        {
          path: ["Felhasznalok", keszito],
          onComplete: result => {
            let userDoc = result.data();
            if (userDoc != null){
              this.kreatorNeve = userDoc['publicName'];
              this.kreatorLeirasa = userDoc['description'];
            }
          }
        }
      );
    }
    }
}
