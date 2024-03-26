import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../types/post";

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {
  post = {} as Post

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const postId = data['postId']

      this.apiService.getPost(postId).subscribe((post) => {
        this.post = post
      })
    })
  }

}
