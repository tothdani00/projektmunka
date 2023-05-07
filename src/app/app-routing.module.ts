import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"posts", component:PostsComponent},
  {path:"**",component:HomeComponent},
  {path:"home",component:HomeComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
