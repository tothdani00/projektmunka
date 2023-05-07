import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostKeszitesComponent } from 'src/app/tools/post-keszites/post-keszites.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{

  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];


  constructor(private dialog: MatDialog){}


  ngOnInit(): void {
    this.postLekeres();
  }

  postKeszites(){
    this.dialog.open(PostKeszitesComponent);
  }

  postLekeres(){
    this.firestore.getCollection(
      {
        path: ["Postok"],
        where: [
          new OrderBy("keszitoId", "desc"),
          new Limit(10)
        ],
        onComplete: (eredmeny) => {
          eredmeny.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              this.posts.push(post);
            }
          )
        },
        onFail: err => {

        }
      }
    )
  }

}
export interface PostData{
  leiras: string;
  keszitoId: string;
  kepUrl?: string;
}