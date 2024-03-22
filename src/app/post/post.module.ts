import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CurrentPostComponent } from './current-post/current-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';



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
    CommonModule
  ]
})
export class PostModule { }
