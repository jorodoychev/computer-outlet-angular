import {Component, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] | null = []

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.getPosts().subscribe(posts => {
      this.posts = Object.values(posts)
    })
  }
}
