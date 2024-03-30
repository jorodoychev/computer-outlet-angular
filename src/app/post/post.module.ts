import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {AddPostComponent} from './add-post/add-post.component';
import {CurrentPostComponent} from './current-post/current-post.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostRoutingModule} from "./post-routing.module";
import {FormsModule} from "@angular/forms";
import {UpdatePostComponent} from './update-post/update-post.component';
import {UserModule} from "../user/user.module";


@NgModule({
  declarations: [
    MainComponent,
    AddPostComponent,
    CurrentPostComponent,
    PostsListComponent,
    UpdatePostComponent,
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    UserModule
  ]
})
export class PostModule {
}
