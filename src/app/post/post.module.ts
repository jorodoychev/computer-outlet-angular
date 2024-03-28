import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {AddPostComponent} from './add-post/add-post.component';
import {CurrentPostComponent} from './current-post/current-post.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostRoutingModule} from "./post-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainComponent,
    AddPostComponent,
    CurrentPostComponent,
    PostsListComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule
  ]
})
export class PostModule {
}
