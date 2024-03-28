import {Component, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {PostService} from "../post.service";
import * as moment from 'moment';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] | null = []

  constructor(private api: PostService) {

  }

  ngOnInit() {
    this.api.getPosts().subscribe(posts => {
      this.posts = Object.values(posts)
        .map(post => ({...post, timeSinceCreation: moment(post.created_at).fromNow()}));
    });

  }
}
