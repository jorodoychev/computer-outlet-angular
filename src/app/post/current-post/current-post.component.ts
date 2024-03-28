import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../types/post";
import {PostService} from "../post.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {
  post: Post = {} as Post


  constructor(
    private apiService: PostService,
    private activeRoute: ActivatedRoute
  ) {
  }

  get isOwner (){
    const currentUserId = JSON.parse(localStorage.getItem('user')|| 'null')._id
    return this.post.userId === currentUserId
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const postId = data['postId']

      this.apiService.getPost(postId).subscribe((post) => {
        this.post = {...post, timeSinceCreation: moment(post.created_at).fromNow()}
      })

    })
  }
}
