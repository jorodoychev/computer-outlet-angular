import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthActivate} from "../guards/auth.activate";
import {MyPostsComponent} from "./my-posts/my-posts.component";
import {MyPostComponent} from "./my-post/my-post.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-posts', component: MyPostsComponent, canActivate: [AuthActivate]},
  {path: 'my-posts/:postId', component: MyPostComponent, canActivate: [AuthActivate]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
