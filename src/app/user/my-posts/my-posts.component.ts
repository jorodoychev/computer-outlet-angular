import {Component, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {PostService} from "../../post/post.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: Post[] | null = []


  constructor(private api: PostService) {
  }

  user = JSON.parse(localStorage.getItem('user') || 'null')
  userId = this.user ? this.user._id : undefined

  get userPosts() {
    if (this.posts?.some(post => post.userId === this.userId)) {
      this.posts = this.posts.filter(post => post.userId === this.userId)
      return this.userId
    }
  }


  ngOnInit() {
    this.api.getPosts().subscribe(posts => {
      this.posts = Object.values(posts)
        .map(post => ({...post, timeSinceCreation: moment(post.created_at).fromNow()}))
    })
  }

}
